import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import {
    type DiscoveryState,
    type DiscoveryStage,
    type PersonaType,
    type ServiceModule,
    createInitialState,
} from '@/lib/ai/discovery-flow';
import { PROACTIVE_GREETING } from '@/lib/ai/discovery-prompts';

export type ChatState = 'idle' | 'thinking' | 'speaking';

export type UseQChatReturn = {
    messages: any[];
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: any, options?: any) => void;
    sendMessage: (text: string) => void;
    isLoading: boolean;
    error: Error | undefined;
    conversationId: string | null;
    chatState: ChatState;
    hesitating: boolean;
    discoveryStage: DiscoveryStage;
    persona: PersonaType;
    serviceModule: ServiceModule | null;
};

export function useQChat(): UseQChatReturn {
    // 1. Visitor ID Management
    const [visitorId, setVisitorId] = useState<string>('');

    useEffect(() => {
        let vId = localStorage.getItem('qm_visitor_id');
        if (!vId) {
            vId = crypto.randomUUID();
            localStorage.setItem('qm_visitor_id', vId);
        }
        setVisitorId(vId);
    }, []);

    // 2. Conversation State
    const [conversationId, setConversationId] = useState<string | null>(null);

    // 3. Discovery Flow State
    const [discoveryState, setDiscoveryState] = useState<DiscoveryState>(createInitialState);
    const greetingInjected = useRef(false);

    // 4. Hesitation Tracking
    const [lastInteractionTime, setLastInteractionTime] = useState<number>(Date.now());
    const [hesitating, setHesitating] = useState<boolean>(false);

    // Update time whenever client finishes mounting
    useEffect(() => {
        setLastInteractionTime(Date.now());
    }, []);

    // 5. Custom Input State Management
    const [input, setInput] = useState<string>('');

    // 6. useChat Configuration
    const chatConfig: any = {
        chatId: conversationId || undefined,
        fetch: async (url: any, options: any) => {
            const parsedBody = options?.body ? JSON.parse(options.body as string) : {};
            // useChat sends { messages: [...] } — extract the last user message
            const msgs = parsedBody.messages || [];
            const lastUserMsg = [...msgs].reverse().find((m: any) => m.role === 'user');
            const message = lastUserMsg?.content || '';

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    visitorId,
                    conversationId,
                    discoveryState,
                })
            });

            // Read discovery state from response headers
            const discoveryStateHeader = response.headers.get('X-Discovery-State');
            if (discoveryStateHeader) {
                try {
                    const newState = JSON.parse(discoveryStateHeader) as DiscoveryState;
                    setDiscoveryState(newState);
                } catch {
                    // Ignore parse errors
                }
            }

            const returnedConvId = response.headers.get('X-Conversation-Id');
            if (returnedConvId && !conversationId) {
                setConversationId(returnedConvId);
            }
            return response;
        },
        onError: (err: Error) => {
            console.error('Chat error:', err);
        }
    };

    const {
        messages,
        input: chatInput,
        setInput: setChatInput,
        status,
        error,
        handleSubmit: originalHandleSubmit,
        setMessages,
    } = useChat(chatConfig) as any;

    const isLoading = status === 'submitted' || status === 'streaming';

    // 7. Proactive Greeting — Q sends first message automatically
    useEffect(() => {
        if (!greetingInjected.current && visitorId && typeof setMessages === 'function') {
            greetingInjected.current = true;
            setMessages([
                {
                    id: 'q-greeting',
                    role: 'assistant',
                    content: PROACTIVE_GREETING,
                }
            ]);
        }
    }, [visitorId, setMessages]);

    // 8. Derived Chat State
    const chatState = useMemo<ChatState>(() => {
        if (messages.length === 0 && !isLoading) return 'idle';
        if (isLoading) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage?.role === 'user') return 'thinking'; // Waiting for Q to respond
            if (lastMessage?.role === 'assistant') return 'speaking'; // Q is streaming
        }
        return 'idle';
    }, [messages, isLoading]);

    // 9. Hook into input changes and form submission to reset hesitation
    const handleSetInput: React.Dispatch<React.SetStateAction<string>> = useCallback((value) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        setInput(value);
        // Sync with useChat's internal input so handleSubmit sends the actual message
        setChatInput(value);
    }, [setChatInput]);

    const handleFormSubmit: (e: any, options?: any) => void = useCallback((e: any, options?: any) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        if (typeof originalHandleSubmit === 'function') {
            originalHandleSubmit(e, options);
        }
        // Clear custom input after useChat picks it up
        setInput('');
    }, [originalHandleSubmit]);

    // Safe message sender: syncs input and submits on next frame to avoid race condition
    const sendMessage = useCallback((text: string) => {
        setLastInteractionTime(Date.now());
        setHesitating(false);
        setInput(text);
        setChatInput(text);
        requestAnimationFrame(() => {
            originalHandleSubmit(new Event('submit') as any);
            setInput('');
        });
    }, [setChatInput, originalHandleSubmit]);

    // 10. Hesitation Timer
    useEffect(() => {
        const interval = setInterval(() => {
            if (chatState === 'idle') {
                const now = Date.now();
                if (now - lastInteractionTime > 30000) {
                    setHesitating(true);
                } else {
                    setHesitating(false);
                }
            } else {
                setHesitating(false);
                setLastInteractionTime(Date.now());
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [chatState, lastInteractionTime]);

    // Reset interaction time when new messages arrive from Q
    useEffect(() => {
        if (!isLoading) {
            setLastInteractionTime(Date.now());
        }
    }, [messages, isLoading]);

    return {
        messages,
        input,
        setInput: handleSetInput,
        handleSubmit: handleFormSubmit,
        sendMessage,
        isLoading,
        error,
        conversationId,
        chatState,
        hesitating,
        discoveryStage: discoveryState.stage,
        persona: discoveryState.persona,
        serviceModule: discoveryState.data.serviceModule,
    };
}
