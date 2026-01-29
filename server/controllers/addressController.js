import Address from "../models/Address.js"

export const addAddress = async(req, res) => {
    try {
        const { fullName, email, phone, street, city, state, zipCode, country } = req.body

        const address = new Address({
            userId: req.userId,
            fullName,
            email,
            phone,
            street,
            city,
            state,
            zipCode,
            country
        })

        await address.save()
        res.json({ success: true, message: "Address added" })
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

export const getAddress = async(req, res) => {
    try {
        const addresses = await Address.find({ userId: req.userId })
        res.json({ success: true, addresses })
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}

export const deleteAddress = async(req, res) => {
    try {
        const { addressId } = req.body
        await Address.findOneAndDelete({ _id: addressId, userId: req.userId })
        res.json({ success: true, message: "Address deleted" })
    } catch (e) {
        res.json({ success: false, message: e.message })
    }
}