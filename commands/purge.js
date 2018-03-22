const Discord = require('discord.js');
const config = require('../config.json');
const errors = require('../util/errors.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return errors.noPermissions(message, 'MANAGE_MESSAGES');

  if (!args[0]) return errors.provideNumber(message);

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.RichEmbed()
    .setTitle('Messages Cleared!')
    .setColor(config.green)
    .setDescription(`Deleted ${args[0]} messages.`)
    message.channel.send(embed).then(msg => msg.delete(5000));
    return
  })

  let embed = new Discord.RichEmbed()
  .setTitle('Messages Purged!')
  .setColor(config.green)
  .addField('Purged By:', `${message.author}`)
  .addField('Number of Messages:', args)
  .addField('Channel:', message.channel)
  .addField('Time:', message.createdAt)

  let auditlogchannel = message.guild.channels.find('name', 'audit-log');
  if (!auditlogchannel) return errors.noLogChannel(message);

  auditlogchannel.send(embed);
  return
};

module.exports.help = {
  name: 'purge',
  description: 'This allows messages to be deleted from a channel.',
  usage: 'purge [number of messages]'
};
