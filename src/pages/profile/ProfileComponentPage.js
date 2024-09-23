import { Grid } from "../../../node_modules/@mui/material/index"
import ChangePasswordComponent from "./ChangePasswordComponent"
import ProfileComponent from "./ProfileComponent"


const ProfilePage = () => {

    return (
        <>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={8} className='tw-bg-white tw-p-8 tw-shadow-md'>
                    <div className="tw-mb-4 tw-text-xl">
                        Edit your profile
                    </div>
                    <ProfileComponent />
                </Grid>
                <Grid item xs={8} className='tw-bg-white tw-p-8 tw-shadow-md'>
                    <div className="tw-mb-4 tw-text-xl">
                        Update password
                    </div>
                    <ChangePasswordComponent />
                </Grid>
            </Grid>

        </>
    )
}

export default ProfilePage