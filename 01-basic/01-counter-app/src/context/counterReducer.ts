export type CounterState = {
  count: number;
  history: number[];
};

export type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'set-step'; payload: number }
  | { type: 'apply-step' };

export function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'increment': {
      const newValue = state.count + 1;
      return {
        count: newValue,
        history: [...state.history.slice(-4), newValue],
      };
    }

    case 'decrement': {
      const newValue = state.count - 1;
      return {
        count: newValue,
        history: [...state.history.slice(-4), newValue],
      };
    }

    case 'reset': {
      return { count: 0, history: [0] };
    }

    case 'set-step': {
      return { ...state, count: action.payload };
    }

    case 'apply-step': {
      const newValue = state.count;

      return {
        count: newValue,
        history: [...state.history.slice(-4), newValue],
      };
    }

    default:
      return state;
  }
}
