/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { sendEmailVerification, signOut, onAuthStateChanged } from "firebase/auth"; // Import signOut and onAuthStateChanged
import { fireAuth } from "pages/authentication/firebase";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const currentUser = fireAuth.currentUser;
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();
    const [ticking, setTicking] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => ticking && setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setTicking(false);
        }
    }, [count, ticking]);

    useEffect(() => {
        // Listen to auth state changes to detect when the user has verified their email
        const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
            if (user) {
                user.reload().then(() => {
                    if (user.emailVerified) {
                        // If the email is verified, sign the user out and reload the page
                        signOut(fireAuth).then(() => {
                            window.location.reload(); // Force a page refresh
                        });
                    }
                });
            }
        });

        // Cleanup the observer on unmount
        return () => unsubscribe();
    }, []);

    if (currentUser?.emailVerified) {
        navigate('/main');
    }

    return (
        <div className="tw-flex tw-justify-center tw-w-full">
            <Grid
                container
                xs={10}
                alignItems="center"
                justifyContent="center"
                className='tw-bg-white tw-p-8 tw-shadow-md tw-flex tw-flex-col'
            >
                <h1>Email Verification</h1>
                <div className="tw-mb-4 tw-text-[18px] tw-font-bold tw-text-center">
                    To Access our features, please verify your email through the button below.
                </div>

                {count < 1 ? (
                    <div className="tw-text-[18px] tw-mb-4">
                        We will send you an email to do so.
                    </div>
                ) : (
                    <div className="tw-text-green-500 tw-text-[18px] tw-mb-4">
                        An email has been sent to your account.
                    </div>
                )}

                {count > 0 && <p>You can resend the verification email in: {count} seconds</p>}

                <Button
                    disabled={count > 0 || ticking}
                    variant="contained"
                    onClick={() => sendEmailVerification(currentUser).then(() => {
                        setSent(true);
                        setCount(61);
                        setTicking(true);
                    })}
                >
                    Verify
                </Button>
            </Grid>
        </div>
    );
};

export default Verify;
