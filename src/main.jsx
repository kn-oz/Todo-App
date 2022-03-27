import React from 'react'
import {render} from 'react-dom'
import './index.css'
import {QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import client  from './query-provider'

const root = document.getElementById('root')

const mainElement =  <BrowserRouter>
<QueryClientProvider client={client}>
<App />
<ReactQueryDevtools/>
</QueryClientProvider>
</BrowserRouter>

render(mainElement, root)


