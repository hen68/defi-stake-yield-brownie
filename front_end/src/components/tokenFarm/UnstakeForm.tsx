import { useUnstakeTokens } from "../../hooks/useUnstakeTokens"
import { Button, CircularProgress, Snackbar } from "@material-ui/core"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { Token } from "../Main"
import React, { useEffect, useState } from "react"
import { Alert } from "@mui/material"

export interface UnstakeProps {
    token: Token
}

export const UnstakeForm = ({ token }: UnstakeProps) => {
    const { image, address, name } = token
    const { approveAndStake: unstakeToken, unstakeState: unstakeTokenState } = useUnstakeTokens()
    const { notifications } = useNotifications()
    const [showUnstakeTokenSuccess, setShowUnstakeTokenSuccess] = useState(false)
    const handleUnstakeSubmit = () => {
        unstakeToken(address)
    }
    let isMining = unstakeTokenState.status === "Mining"

    const handleCloseSnack = () => {
        setShowUnstakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Unstake Tokens").length > 0) {
            setShowUnstakeTokenSuccess(true)
        }
    }, [notifications, showUnstakeTokenSuccess])

    return (
        <div>
            <Button onClick={handleUnstakeSubmit} color="primary" size="large" disabled={isMining}>
                {isMining ? <CircularProgress size={26} /> : "Unstake all"}
            </Button>

            <Snackbar
                open={showUnstakeTokenSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Tokens unstaked!
                </Alert>
            </Snackbar>
        </div>
    )
}