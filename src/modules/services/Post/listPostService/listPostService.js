const { getUserByIdService } = require("../../User/getUserByIdService/getUserByIdService");
const { getPostByUserIdRepositories } = require("../../../repositories");
const { ApplicationError } = require("../../../common/errors/application-error");

const getPostByUserIdService = async ({
    user_id
}) => {

    const {
        user
    } = await getUserByIdService({
        user_id
    })

    const has_author = Array.isArray(user) && user.length > 0;

    if(has_author === false) {
        throw new ApplicationError(404, "Missing author in database")
    }

    const {
        posts = []
    } = await getPostByUserIdRepositories({
        user_id
    });

    return {
        posts
    };
}

module.exports = {
    getPostByUserIdService
}