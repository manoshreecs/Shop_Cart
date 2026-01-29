import jwt from 'jsonwebtoken';

export const sellerLogin = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.SELLER_EMAIL &&
            password === process.env.SELLER_PASSWORD
        ) {
            const token = jwt.sign({ email },
                process.env.JWT_SECRET, { expiresIn: '1d' }
            );

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.json({ success: true, message: 'Logged In' });
        }

        return res.json({ success: false, message: 'Invalid Credentials' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const sellerLogout = async(req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        return res.json({ success: true, message: 'Logged Out' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};