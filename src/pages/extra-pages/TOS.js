// material-ui
import {
    Grid,
} from '@mui/material';

// assets
import { ReactComponent as LogoSVG } from 'components/Logo/logo.svg';

// avatar style

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const TOS = () => {

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75} className='tw-justify-center tw-items-center'>
            <Grid item xs={12} sx={{ mb: -2.25 }} className=' tw-p-8 tw-pb-20 tw-bg-white tw-ml-[1.5rem] tw-my-[2.5rem] tw-border-[1px] tw-border-[#e6ebf1] tw-border-solid tw-rounded-[8px]'>
                <Grid item xs={12} sx={{ mb: -0.25 }} className='tw-justify-center tw-flex tw-w-full tw-flex-col tw-items-center'>
                    <LogoSVG className='tw-w-[200px] tw-h-[300px]' />
                    <h1>Terms of Service</h1>
                </Grid>
                <Grid xs={12} item className='tw-m-auto tw-text-center'>

                    <p>Our Terms of Service were last updated on 15/8/2024.</p>

                    <h2>Introduction</h2>

                    <p>Welcome to the Medmythica website. This site is an online revision website for the use of Medical students.</p>

                    <p>These Terms of Service (the “Terms”) govern your use of the Medmythica website. The Terms are a binding legal contract between you and Medmythica. Use of this site is conditional on accepting the Terms; please ensure that you read through them thoroughly and understand them before using the Medmythica website.</p>

                    <p>These Terms apply to the use of the services provided by Medmythica. If you do not agree to be bound by these Terms, do not use this website.</p>

                    <p>Terms and Conditions may change over time; those applicable to subscribers are those that are current and agreed upon when a user subscribes.</p>

                    <p>Both the website and the subscription process are in English only. If you have any questions regarding the Terms and Conditions, please do not hesitate to contact us at <a href="mailto:support@medmythica.com">support@medmythica.com</a>.</p>

                    <h2>Limitation of Liability</h2>

                    <p>Exclusions and limitation will apply to the greatest extent consistent with applicable law. Any claim against us shall be limited to the amount you paid, if any, for use of the products and services included within the purchased subscription, herein referred to as ‘Offerings’.</p>

                    <p>Under no circumstances, will Medmythica be liable for damages or losses out of your access, use, misuse or inability to use the services, however caused, whether in contract, tort, negligence, strict liability, or otherwise, even if Medmythica advised of the possibility of such damages, or in connection with any failure of performance, error, omission, interruption, defect, computer virus, line or system failure, or other technologically harmful material that may infect your device, data, or other proprietary material due to your use of our services or to your downloading of any content on it.</p>

                    <h2>Copyright</h2>

                    <p>The Medmythica site is legally protected by copyright, encompassing its content, design, layout, databases, and graphics. Unauthorized reproduction, storage, or use, whether in electronic, paper, mechanical, photocopying, recording, or broadcasting form, is strictly prohibited. The site is not to be displayed in public gatherings.</p>

                    <p>You are permitted to use the material available for your personal, non-commercial, and at-home purposes. However, it must remain unaltered, and all copyright notices must be retained. Medmythica retains full intellectual property rights to all content on their website. You are expressly forbidden from creating derivative works or making any other adaptations without our prior written consent.</p>

                    <p>Any attempt to utilize the service for purposes extending beyond personal and individual revision, such as copying questions, answers, notes, or attempting to tamper, hack, modify, or otherwise compromise the security or functionality of the service provided by Medmythica, will result in the immediate termination of your account. Such actions may also lead to damages and other penalties, including potential criminal prosecution where legally applicable.</p>

                    <p>All rights not explicitly granted in these Terms and Conditions or in any written license are unequivocally reserved.</p>

                    <h2>Acceptable Usage</h2>

                    <p>By using our website, whether as a registered user or non-registered user, you are indicating that you accept these Terms and Conditions and agree to abide by them.</p>

                    <p>Accounts are personal to the subscriber and for their sole and non-commercial home use. Passwords and other log-in details must not be passed to others. We have the right to take action if this requirement is not adhered to, including, but not limited to, immediate termination of your subscription.</p>

                    <p>If you use or attempt to use the service for purposes other than personal, individual revision, including but not limited to copying questions, answers, or notes, or attempt to tamper, hack, modify, or otherwise use the website in any way that is likely to compromise or corrupt the security or functionality of the service provided by Medmythica, your account will be terminated, and you will be subject to damages and other penalties, including criminal prosecution where available.</p>

                    <p>Whilst we will endeavor to ensure that the website availability is not interrupted, access may be restricted from time to time to allow for site maintenance or upgrade. Website availability may also be interrupted due to technical problems. Again, we will always try to resolve these as soon as possible, but we cannot accept responsibility for any loss or damages that may result from this.</p>

                    <p>The website has been optimized for use on a PC running Windows. Use of other equipment to access the site may result in altered functionality.</p>

                    <h2>Prohibited Uses</h2>

                    <p>You may use the Offerings only for lawful purposes and in accordance with the Terms of Service. By visiting our Site or using our Products, you hereby agree not to use the Offerings:</p>

                    <ul>
                        <li className='tw-text-start'>In any way that violates any applicable local or international law or regulation.</li>
                        <li className='tw-text-start'>To transmit or procure the sending of any advertising or promotional material, including any ‘junk mail’, ‘chain letter’, ‘spam’ or any other similar solicitation.</li>
                        <li className='tw-text-start'>To impersonate or attempt to impersonate Medmythica, an employee, another user, or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing).</li>
                        <li className='tw-text-start'>For the purpose of exploiting, harming or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
                        <li className='tw-text-start'>To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the Site, or which, as determined by use, may harm Medmythica or users of the Site or expose them to liability.</li>
                    </ul>

                    <h2>Subscription</h2>

                    <p>The price you pay for Medmythica is indicated on the website.</p>

                    <p>We currently accept payments through VISA, Mastercard, Paypal, and Paymob, In cases of non-payment or subscription renewal failure, access to subscriber resources will be suspended.
                        Please note that if you wish to cancel any subscription that you have purchased after the service goes into effect, cancellation shall be at our discretion and, if accepted, may be subject to a cancellation charge. You hereby agree that due to the nature of the service provided by Medmythica, cancellation or refund of your subscription is not permitted once the service has started.
                    </p>
                    <h2>Intellectual Property</h2>

                    <p>Except as otherwise indicated, the Website and its entire contents are owned by Medmythica. Any third-party copyrights, names, trademarks, or service marks are the properties of their respective owners. The Offerings may not be copied, reproduced, modified, published, uploaded, posted, transmitted, or distributed in any way, without Medmythica’s prior written permission.
                        Amendments</p>

                    <p>We may need to make changes to any portion of this Agreement from time to time for many reasons, including updates to Medmythica Offerings or changes in law. If we make a material change to this Agreement, it will be effective 30 days following our dispatch of notice to you. You are responsible for periodically reviewing this Agreement for updates and amendments. By continuing to use the Medmethyica website, you will be deemed to have agreed to and accepted any amendments. If you do not agree to any change to this Agreement, you must discontinue using the Medmythica website and Offerings.
                    </p>

                    <h2>Suspension and Termination of Service </h2>

                    <p>Medmythica may suspend your access to the Offerings and terminate this Agreement and your use of the Offerings at any time in the events you materially breach this agreement (including failure to pay). Medmythica may immediately suspend or terminate your access to the Offerings without liability if you are in violation of Sections 5 and 6.</p>
                </ Grid>
            </Grid>

        </Grid>
    );
};

export default TOS;
