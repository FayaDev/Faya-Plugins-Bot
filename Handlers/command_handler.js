const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files_moderation = fs.readdirSync('./Commands/Moderation/').filter(file => file.endsWith('.js'));
    const command_files_suggestion = fs.readdirSync('./Commands/Suggestion/').filter(file => file.endsWith('.js'));
    const command_files_general = fs.readdirSync('./Commands/General/').filter(file => file.endsWith('.js'));
    const command_files_other = fs.readdirSync('./Commands/Other/').filter(file => file.endsWith('.js'));

    for (const file of command_files_moderation) {
        const command = require(`../Commands/Moderation/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }

    for (const file of command_files_suggestion) {
        const command = require(`../Commands/Suggestion/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }

    for (const file of command_files_general) {
        const command = require(`../Commands/General/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }

    for (const file of command_files_other) {
        const command = require(`../Commands/Other/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            continue;
        }
    }
}