import './App.css'
import CustomThemeProvider from './Theme'
import { Navbar } from './container'
import { MainPage } from './page'
import { GlobalState } from './utils'

const App = ()=> {
  return (
    <GlobalState>
      <CustomThemeProvider>
        <Navbar />
        <MainPage />
      </CustomThemeProvider>
    </GlobalState>
  )
}

export default App
