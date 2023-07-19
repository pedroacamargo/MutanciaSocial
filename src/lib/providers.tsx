'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import StyledComponentsRegistry from './registry'
import GlobalStyle from '@/app/GlobalStyles.styles'

export const Providers = (props: React.PropsWithChildren) => {
    return (
        <StyledComponentsRegistry>
            <Provider store={store}>
                <GlobalStyle/>
                {props.children}
            </Provider>
        </StyledComponentsRegistry>
    )
}