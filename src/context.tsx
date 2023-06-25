// Packages
import { useLocalObservable } from 'mobx-react-lite'
import { createContext, useContext } from 'react'

// Store
import { createAnalysisStore, StoreProps as analysisProps } from './stores/game'

const AppContextAnalysis = createContext(null)

export const AnalysisProvider = ({ children }: any) => {
  const store: any = useLocalObservable(createAnalysisStore)

  return (
    <AppContextAnalysis.Provider value={store}>
      {children}
    </AppContextAnalysis.Provider>
  )
}
export const useAnalysisStore: () => analysisProps = () =>
  useContext<any>(AppContextAnalysis)
