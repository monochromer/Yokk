var schema = {
    name: String,
    surname: String,
    contacts: {
        email: String,
        phone: String,
        skype: String,
    },
    workhours: String,
    team: String,
    position: String,
    birthdate: String,
    soctial:{
        vk: String,
        twitter: String,
        facebook: String,
        linkedin: String,
        googleplus: String,
        git: String
    },
    about: String
};

module.exports = schema;
