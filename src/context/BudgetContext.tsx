import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>,
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

// La acción de tener el estado global -> la creación del context, para crear la estructura de context
export const BudgetContext = createContext<BudgetContextProps>({  } as BudgetContextProps)

// Este me trae los datos que va a tener ese context -> de donde provienen los datos
export const BudgetProvider = ( {children}: BudgetProviderProps ) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExpenses = useMemo(() => state.expenses.reduce( (total, expense) => expense.amount + total, 0 ), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        // es como un componente, englobamos toda la aplicación dentro de esto
        <BudgetContext.Provider
            value={{ // en value le paso esos props para el dispatch y el state
                // aca adentro del value puedo poner muchas mas cosa, por ejemplo un auth
                state, 
                dispatch,
                totalExpenses,
                remainingBudget
                // auth
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}