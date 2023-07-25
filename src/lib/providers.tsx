'use client'

import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { store } from '@/redux/store'
import StyledComponentsRegistry from './registry'
import GlobalStyle from '@/app/GlobalStyles.styles'

const helmetContext = {};

export const Providers = (props: React.PropsWithChildren) => {
    return (
        <StyledComponentsRegistry>
            <HelmetProvider context={helmetContext}>                
                <Provider store={store}>
                    <GlobalStyle/>
                    {props.children}
                </Provider>
            </HelmetProvider>
        </StyledComponentsRegistry>
    )
}