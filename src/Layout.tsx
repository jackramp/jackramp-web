import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'

import { config } from './lib/wagmi'
import Navbar from './components/bar/Navbar';
const queryClient = new QueryClient();

export const CustomRainbowContext = ({ children }: { children: React.ReactNode }) => {
    return (
        <RainbowKitProvider
            theme={darkTheme({
                accentColor: '#7b3fe4',
                accentColorForeground: 'white',
                borderRadius: 'small',
                fontStack: 'system',
                overlayBlur: 'small',
            })}
            modalSize='compact'
        >
            {children}
        </RainbowKitProvider>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <CustomRainbowContext>
                    <Navbar />
                    {children}
                </CustomRainbowContext>
            </QueryClientProvider>
        </WagmiProvider>
    )
}