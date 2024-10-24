import { BackgroundGradient } from "../ui/background-gradient";
import { Button } from "../ui/button";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function ButtonConnectWallet() {
    return (
        <ConnectButtonWalletComponents />
    );
}

export const ConnectButtonWalletComponents = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected =
                    ready &&
                    account &&
                    chain
                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <div className="w-fit flex">
                                        <BackgroundGradient className="rounded-full w-fit bg-background">
                                            <Button className="w-fit hover:rounded-full rounded-full" variant={"ghost"} onClick={openConnectModal}>Connect Wallet</Button>
                                        </BackgroundGradient>
                                    </div>
                                );
                            }
                            if (chain.unsupported) {
                                return (
                                    <Button onClick={openChainModal}>
                                        Wrong network
                                    </Button>
                                );
                            }
                            return (
                                <div style={{ display: 'flex', gap: 12, zIndex: 50 }} className="w-fit flex-wrap">
                                    <div className="w-fit flex">
                                        <BackgroundGradient className="rounded-full w-fit bg-background">
                                            <Button
                                                onClick={openChainModal}
                                                style={{ display: 'flex', alignItems: 'center' }}
                                                variant={'outline'}
                                                className="rounded-full hover:rounded-full"
                                            >
                                                {chain.hasIcon && (
                                                    <div
                                                        style={{
                                                            background: chain.iconBackground,
                                                            width: 12,
                                                            height: 12,
                                                            borderRadius: 999,
                                                            overflow: 'hidden',
                                                            marginRight: 4,
                                                        }}
                                                    >
                                                        {chain.iconUrl && (
                                                            <img
                                                                alt={chain.name ?? 'Chain icon'}
                                                                src={chain.iconUrl}
                                                                style={{ width: 12, height: 12 }}
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {chain.name}
                                            </Button>
                                        </BackgroundGradient>
                                    </div>
                                    <div className="w-fit flex">
                                        <BackgroundGradient className="rounded-full w-fit bg-background">
                                            <Button onClick={openAccountModal} variant={'outline'} className="rounded-full hover:rounded-full">
                                                {account.displayName}
                                                {account.displayBalance
                                                    ? ` (${account.displayBalance})`
                                                    : ''}
                                            </Button>
                                        </BackgroundGradient>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
};
