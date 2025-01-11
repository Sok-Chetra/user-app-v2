import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

// Type definitions
type Answer = {
    a: string[];
    q: string;
    t: 'SELECT' | 'DATE' | "MULTI_SELECT" | string;
}

type SelectedService = {
    service_code?: string | null;
    sub_service_code?: string | null;
    is_parent?: boolean | null;
    category_name?: string | null;
    category_id?: string | null;
}

export type ServiceState = {
    user_answers: Answer[];
    _hasHydrated: boolean;
    selected_service: SelectedService;
    login_from?: number | string | 0;
}

export type ServiceActions = {
    setUserAnswer: (answer: Answer) => void;
    setHasHydrated: (state: boolean) => void;
    setLoginFrom: (step_num: number | string) => void;
    setSelectedService: (service: SelectedService) => void;
    clearUserAnswers: () => void;  // New action to clear user answers
}

export type ServiceStore = ServiceState & ServiceActions

export const defaultInitState: ServiceState = {
    user_answers: [],
    _hasHydrated: false,
    login_from: 0,
    selected_service: {
        service_code: null,
        sub_service_code: null,
        is_parent: null,
        category_name: null,
        category_id: null,
    },
}

export const createServiceStore = () => {
    return createStore<ServiceStore>()(
        persist(
            (set, get) => ({
                ...defaultInitState,
                setUserAnswer: (newAnswer: Answer) => {
                    const existingAnswers = get().user_answers;
                    const { q: question, a: newOptionAnswers, t: questionType } = newAnswer;
                    let updatedAnswers = [];

                    if (questionType !== "MULTI_SELECT") {
                        const existingIndex = existingAnswers.findIndex((entry: any) => entry.q === question);
                        const isDuplicate = existingAnswers.some((entry: any) => entry.q === question && entry.a[0] === newOptionAnswers[0]);

                        if (existingIndex !== -1) {
                            if (!isDuplicate) {
                                updatedAnswers = existingAnswers.map((answer: any, index: any) =>
                                    index === existingIndex ? newAnswer : answer
                                );
                            } else {
                                updatedAnswers = existingAnswers.filter((_: any, index: any) => index !== existingIndex);
                            }
                        } else {
                            updatedAnswers = [...existingAnswers, newAnswer];
                        }
                    } else {
                        const index = existingAnswers.findIndex((option: any) => option.q === question);

                        if (index !== -1) {
                            const existingAnswersArray = existingAnswers[index].a;
                            const answerIndex = existingAnswersArray.indexOf(newOptionAnswers[0]);

                            if (answerIndex !== -1) {
                                const updatedAnswersArray = existingAnswersArray.filter((answer: any) => answer !== newOptionAnswers[0]);
                                updatedAnswers = existingAnswers.map((answer: any, i: any) =>
                                    i === index ? { ...answer, a: updatedAnswersArray } : answer
                                );
                            } else {
                                const updatedAnswersArray = [...existingAnswersArray, newOptionAnswers[0]];
                                updatedAnswers = existingAnswers.map((answer: any, i: any) =>
                                    i === index ? { ...answer, a: updatedAnswersArray } : answer
                                );
                            }
                        } else {
                            updatedAnswers = [...existingAnswers, newAnswer];
                        }
                    }

                    set({
                        user_answers: updatedAnswers,
                    });
                },
                setLoginFrom: (step_num: number | string) => {
                    set({
                        login_from: step_num
                    })
                },
                setHasHydrated: (state: boolean) => {
                    set({
                        _hasHydrated: state,
                    });
                },
                setSelectedService: (service: SelectedService) => {
                    const currentService = get().selected_service;

                    // const isSameService = currentService.service_code === service.service_code;
                    // if (isSameService) {
                    //     // Reset to an empty state if the service is the same
                    //     set({
                    //         selected_service: {
                    //             service_code: null,
                    //             sub_service_code: null,
                    //             is_parent: null,
                    //             category_name: null
                    //         }
                    //     });
                    // } else {
                    //     // Otherwise, set the selected service
                    //     set({
                    //         selected_service: {
                    //             ...currentService,
                    //             ...service,
                    //         },
                    //     });
                    // }

                    set({
                        selected_service: {
                            ...currentService,
                            ...service,
                        },
                    });

                },
                clearUserAnswers: () => {
                    set({
                        user_answers: [],  // Clear the user_answers array
                    });
                }
            }),
            {
                onRehydrateStorage: () => async (state: any) => {
                    state.setHasHydrated(true);
                },
                name: 'services', // Session storage key for combined state
                storage: createJSONStorage(() => AsyncStorage),
            },
        ));
}

export const serviceStore = createServiceStore();
