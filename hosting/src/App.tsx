import './App.css'
import CustomThemeProvider from './Theme'
import MainPage from './page/MainPage'
import { GlobalState } from './utils'

const App = ()=> {
  return (
    <GlobalState>
      <CustomThemeProvider>
        <MainPage />
      </CustomThemeProvider>
    </GlobalState>
  )
}

export default App
