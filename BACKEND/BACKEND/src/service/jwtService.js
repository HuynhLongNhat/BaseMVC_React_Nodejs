import db from "../models/index"

const getGroupWithRoles = async (user) => {
    // scope
    let roles = await db.Group.findOne({
        where: { id: user.GroupId },
        include: [{
            model: db.Role, attributes: ['id', 'url', "description"],
            through: { attributes: [] }
        }],

    })
    return roles ? roles : {}
}

module.exports = {
    getGroupWithRoles
}