import React from 'react'
import ReactDOM from 'react-dom/client'
import { reset } from 'styles'
import { Global } from '@emotion/react'
import Test from 'Test'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={reset} />
    <Test />
  </React.StrictMode>,
)
