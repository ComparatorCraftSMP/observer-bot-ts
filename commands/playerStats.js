const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerstats')
        .setDescription('your statistic on the server')
        .addStringOption(option => option.setName('stat')
            .setDescription('your statistic')
            .setRequired(true)
            .addChoice('MineEmeralds', 'ts_MineEmerald')
            .addChoice('UseTotem', 'ts_UseTotem')
            .addChoice('Deaths', 'ts_Deaths')
            .addChoice('DamageDealt', 'ts_DamageDealt')
            .addChoice('playTime', 'hc_playTime')
            .addChoice('Walk', 'ts_Walk')
            .addChoice('MineRedstone', 'ts_MineRedstone')
            .addChoice('KillEDragon', 'ts_KillEDragon')
            .addChoice('DamageTaken', 'ts_DamageTaken')
            .addChoice('TotalOresMined', 'hc_MineOreShow')
            .addChoice('MineCoal', 'ts_MineCoal')
            .addChoice('elytraKm', 'hc_elytraKm')
            .addChoice('MineQuartz', 'ts_MineQuartz')
            .addChoice('PlayerKills', 'ts_PlayerKills')
            .addChoice('Sprint', 'ts_Sprint')
            .addChoice('Sneak', 'ts_Sneak')
            .addChoice('swimKm', 'hc_swimKm')
            .addChoice('MineDEmerald', 'hc_MineDEmerald')
            .addChoice('MobKills', 'ts_MobKills')
            .addChoice('Swim', 'ts_Swim')
            .addChoice('Jump', 'ts_Jump')
            .addChoice('KillWither', 'ts_KillWither')
            .addChoice('MineDiamond', 'ts_MineDiamond')
            .addChoice('MineNetherite', 'ts_MineNetherite')
            .addChoice('LastDeath', 'ts_LastDeath')
            )
        .addUserOption(option => option.setName('player').setDescription('the person your finding the statistic for')),
    
    async execute(interaction) {
        
        let userIGN = ''

        if(interaction.options.getMember('player').nickname != null) {
            userIGN = interaction.options.getMember('player').nickname
        } else {
            userIGN = interaction.options.getMember('player').user.username
        }
        
        const stat = interaction.options.getString('stat')  
        const statRe = /^[^_]+_/g
        const statName = stat.replace(statRe, '')
       
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/scoreboard/${stat}`, options)
        const data = await response.json()
        const statObj = data.scores.find(x => x.entry === userIGN)

        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`Player stats of ${userIGN}`)
                  .setDescription(`${statName}: ${statObj.value}`)
                  .setThumbnail(`https://minotar.net/armor/bust/${userIGN}/100.png`)

        interaction.reply({embeds: [embed]}) 
          
        

       console.log(`${interaction.user.tag} checked the stats of ${interaction.getUserOption('player').guildMember.tag} in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}

//Entire list of possible stats

/*

            .addChoice('elytraCm', 'hc_elytraCm')
            .addChoice('KillCod', 'ts_KillCod')
            .addChoice('KillDonkey', 'ts_KillDonkey')
            .addChoice('KillGhast', 'ts_KillGhast')
            .addChoice('KillZombieH', 'ts_KillZombieH')
            .addChoice('KillShulker', 'ts_KillShulker')
            .addChoice('DthPhantom', 'ts_DthPhantom')
            .addChoice('FishCaught', 'ts_FishCaught')
            .addChoice('DthSnowGolem', 'ts_DthSnowGolem')
            .addChoice('DthRavager', 'ts_DthRavager')
            .addChoice('KillPiglin', 'ts_KillPiglin')
            .addChoice('KillZombieV', 'ts_KillZombieV')
            .addChoice('DthZombie', 'ts_DthZombie')
            .addChoice('elytraKmShow', 'hc_elytraKmShow')
            .addChoice('KillLlama', 'ts_KillLlama')
            .addChoice('KillPig', 'ts_KillPig')
            .addChoice('FurnaceUsed', 'ts_FurnaceUsed')
            .addChoice('MineCoal', 'hc_MineCoal')
            .addChoice('MineEmerald', 'ts_MineEmerald')
            .addChoice('KillCow', 'ts_KillCow')
            .addChoice('DthWitch', 'ts_DthWitch')
            .addChoice('MineDCoal', 'ts_MineDCoal')
            .addChoice('UseTotem', 'ts_UseTotem')
            .addChoice('KillSlime', 'ts_KillSlime')
            .addChoice('Deaths', 'ts_Deaths')
            .addChoice('DamageDealt', 'ts_DamageDealt')
            .addChoice('PigRide', 'ts_PigRide')
            .addChoice('MineCopper', 'ts_MineCopper')
            .addChoice('KillHorse', 'ts_KillHorse')
            .addChoice('MineEmeraldShow', 'hc_MineEmeraldShow')
            .addChoice('DthZombieV', 'ts_DthZombieV')
            .addChoice('KillOcelot', 'ts_KillOcelot')
            .addChoice('UseEyeOfEnder', 'ts_UseEyeOfEnder')
            .addChoice('BreakBow', 'ts_BreakBow')
            .addChoice('DthEDragon', 'ts_DthEDragon')
            .addChoice('KillGlowSquid', 'ts_KillGlowSquid')
            .addChoice('playTime', 'hc_playTime')
            .addChoice('DthZombieH', 'ts_DthZombieH')
            .addChoice('Walk', 'ts_Walk')
            .addChoice('MineRedstone', 'ts_MineRedstone')
            .addChoice('DthBee', 'ts_DthBee')
            .addChoice('CraftEndCryst', 'ts_CraftEndCryst')
            .addChoice('KillChicken', 'ts_KillChicken')
            .addChoice('BreakNHoe', 'ts_BreakNHoe')
            .addChoice('KillEDragon', 'ts_KillEDragon')
            .addChoice('KillSnowGolem', 'ts_KillSnowGolem')
            .addChoice('ChestOpened', 'ts_ChestOpened')
            .addChoice('UseLavaBucket', 'ts_UseLavaBucket')
            .addChoice('MineSCoal', 'hc_MineSCoal')
            .addChoice('MineLapis', 'hc_MineLapis')
            .addChoice('DthFox', 'ts_DthFox')
            .addChoice('KillSquid', 'ts_KillSquid')
            .addChoice('MineDDiamond', 'ts_MineDDiamond')
            .addChoice('TrapChestOpen', 'ts_TrapChestOpen')
            .addChoice('UseTrident', 'ts_UseTrident')
            .addChoice('DthEnderman', 'ts_DthEnderman')
            .addChoice('MineSDiamond', 'hc_MineSDiamond')
            .addChoice('MineIronShow', 'hc_MineIronShow')
            .addChoice('CraftConduit', 'ts_CraftConduit')
            .addChoice('KillEndermite', 'ts_KillEndermite')
            .addChoice('KillEnderman', 'ts_KillEnderman')
            .addChoice('swimCm', 'hc_swimCm')
            .addChoice('DthPolarBear', 'ts_DthPolarBear')
            .addChoice('BreakNShovel', 'ts_BreakNShovel')
            .addChoice('DamageTaken', 'ts_DamageTaken')
            .addChoice('KillSalmon', 'ts_KillSalmon')
            .addChoice('MineDIron', 'hc_MineDIron')
            .addChoice('KillParrot', 'ts_KillParrot')
            .addChoice('DthWither', 'ts_DthWither')
            .addChoice('KillTurtle', 'ts_KillTurtle')
            .addChoice('KillBat', 'ts_KillBat')
            .addChoice('KillSheep', 'ts_KillSheep')
            .addChoice('UseHoneyBottl', 'ts_UseHoneyBottl')
            .addChoice('KillGoat', 'ts_KillGoat')
            .addChoice('MinecartRide', 'ts_MinecartRide')
            .addChoice('DthDrowned', 'ts_DthDrowned')
            .addChoice('KillMule', 'ts_KillMule')
            .addChoice('constant', 'hc_constant')
            .addChoice('Fall', 'ts_Fall')
            .addChoice('DthSkeleton', 'ts_DthSkeleton')
            .addChoice('BreakShears', 'ts_BreakShears')
            .addChoice('KillIronGolem', 'ts_KillIronGolem')
            .addChoice('KillEGuardian', 'ts_KillEGuardian')
            .addChoice('MineDRedstone', 'hc_MineDRedstone')
            .addChoice('MineDCopper', 'hc_MineDCopper')
            .addChoice('UseBonemeal', 'ts_UseBonemeal')
            .addChoice('DthWandering', 'ts_DthWandering')
            .addChoice('KillHoglin', 'ts_KillHoglin')
            .addChoice('UseBottleEnch', 'ts_UseBottleEnch')
            .addChoice('KillRabbit', 'ts_KillRabbit')
            .addChoice('DthSpider', 'ts_DthSpider')
            .addChoice('MineQuartz', 'hc_MineQuartz')
            .addChoice('KillPigman', 'ts_KillPigman')
            .addChoice('KillVex', 'ts_KillVex')
            .addChoice('ShulkerBox', 'ts_ShulkerBox')
            .addChoice('MineDCopper', 'ts_MineDCopper')
            .addChoice('MineLapisShow', 'hc_MineLapisShow')
            .addChoice('KillPanda', 'ts_KillPanda')
            .addChoice('DthBlaze', 'ts_DthBlaze')
            .addChoice('KillSilvfish', 'ts_KillSilvfish')
            .addChoice('PlayNoteblock', 'ts_PlayNoteblock')
            .addChoice('Fly', 'ts_Fly')
            .addChoice('KillWSkeleton', 'ts_KillWSkeleton')
            .addChoice('MineSLapis', 'hc_MineSLapis')
            .addChoice('BreakHoe', 'ts_BreakHoe')
            .addChoice('MineNetherite', 'hc_MineNetherite')
            .addChoice('KillGuardian', 'ts_KillGuardian')
            .addChoice('DthTraderLla', 'ts_DthTraderLla')
            .addChoice('MineOreShow', 'hc_MineOreShow')
            .addChoice('DthPiglin', 'ts_DthPiglin')
            .addChoice('KillDrowned', 'ts_KillDrowned')
            .addChoice('KillMagmaCube', 'ts_KillMagmaCube')
            .addChoice('DthPanda', 'ts_DthPanda')
            .addChoice('Crouch', 'ts_Crouch')
            .addChoice('UseTorch', 'ts_UseTorch')
            .addChoice('BreakSword', 'ts_BreakSword')
            .addChoice('MineCoal', 'ts_MineCoal')
            .addChoice('KillZoglin', 'ts_KillZoglin')
            .addChoice('MineCopper', 'hc_MineCopper')
            .addChoice('UseBucket', 'ts_UseBucket')
            .addChoice('KillBlaze', 'ts_KillBlaze')
            .addChoice('playTick', 'hc_playTick')
            .addChoice('DthDolphin', 'ts_DthDolphin')
            .addChoice('elytraKm', 'hc_elytraKm')
            .addChoice('DthHoglin', 'ts_DthHoglin')
            .addChoice('DthSkeletonH', 'ts_DthSkeletonH')
            .addChoice('KillCveSpider', 'ts_KillCveSpider')
            .addChoice('MineQuartz', 'ts_MineQuartz')
            .addChoice('MineIron', 'ts_MineIron')
            .addChoice('KillVindicatr', 'ts_KillVindicatr')
            .addChoice('DthVindicatr', 'ts_DthVindicatr')
            .addChoice('MineSCopper', 'hc_MineSCopper')
            .addChoice('BreakAxe', 'ts_BreakAxe')
            .addChoice('KillPuffish', 'ts_KillPuffish')
            .addChoice('RecordsPlayed', 'ts_RecordsPlayed')
            .addChoice('MineDGold', 'hc_MineDGold')
            .addChoice('UsePotion', 'ts_UsePotion')
            .addChoice('DthLlama', 'ts_DthLlama')
            .addChoice('KillSkeletonH', 'ts_KillSkeletonH')
            .addChoice('UseFishingRod', 'ts_UseFishingRod')
            .addChoice('MineDLapis', 'ts_MineDLapis')
            .addChoice('Aviate', 'ts_Aviate')
            .addChoice('BreakPick', 'ts_BreakPick')
            .addChoice('MineSIron', 'hc_MineSIron')
            .addChoice('FlowerPotted', 'ts_FlowerPotted')
            .addChoice('MineRedstoneShow', 'hc_MineRedstoneShow')
            .addChoice('MineCoalShow', 'hc_MineCoalShow')
            .addChoice('KillBee', 'ts_KillBee')
            .addChoice('KillDolphin', 'ts_KillDolphin')
            .addChoice('MineEmerald', 'hc_MineEmerald')
            .addChoice('KillCount', 'ts_KillCount')
            .addChoice('KillHusk', 'ts_KillHusk')
            .addChoice('BreakNSword', 'ts_BreakNSword')
            .addChoice('MineDIron', 'ts_MineDIron')
            .addChoice('Crafts', 'ts_Crafts')
            .addChoice('DthGhast', 'ts_DthGhast')
            .addChoice('PlayerKills', 'ts_PlayerKills')
            .addChoice('DthSilvfish', 'ts_DthSilvfish')
            .addChoice('KillIllusion', 'ts_KillIllusion')
            .addChoice('MineGoldShow', 'hc_MineGoldShow')
            .addChoice('BreakNPick', 'ts_BreakNPick')
            .addChoice('KillWolf', 'ts_KillWolf')
            .addChoice('Sprint', 'ts_Sprint')
            .addChoice('Sneak', 'ts_Sneak')
            .addChoice('KillWitch', 'ts_KillWitch')
            .addChoice('TotalKills', 'ts_TotalKills')
            .addChoice('DthTurtle', 'ts_DthTurtle')
            .addChoice('DthCveSpider', 'ts_DthCveSpider')
            .addChoice('MineDEmerald', 'ts_MineDEmerald')
            .addChoice('DthGuardian', 'ts_DthGuardian')
            .addChoice('playTimeShow', 'hc_playTimeShow')
            .addChoice('AnimalsBred', 'ts_AnimalsBred')
            .addChoice('MineGold', 'hc_MineGold')
            .addChoice('KillTropifish', 'ts_KillTropifish')
            .addChoice('DthPillager', 'ts_DthPillager')
            .addChoice('DthStray', 'ts_DthStray')
            .addChoice('UseGoldApple', 'ts_UseGoldApple')
            .addChoice('DthEvoker', 'ts_DthEvoker')
            .addChoice('KillVillager', 'ts_KillVillager')
            .addChoice('KillSpider', 'ts_KillSpider')
            .addChoice('UseSnowball', 'ts_UseSnowball')
            .addChoice('DthWSkeleton', 'ts_DthWSkeleton')
            .addChoice('MineLapis', 'ts_MineLapis')
            .addChoice('swimKm', 'hc_swimKm')
            .addChoice('MineDEmerald', 'hc_MineDEmerald')
            .addChoice('CraftBeacon', 'ts_CraftBeacon')
            .addChoice('MobKills', 'ts_MobKills')
            .addChoice('EnderChest', 'ts_EnderChest')
            .addChoice('CakeEaten', 'ts_CakeEaten')
            .addChoice('DthZoglin', 'ts_DthZoglin')
            .addChoice('MineCopperShow', 'hc_MineCopperShow')
            .addChoice('DthEGuardian', 'ts_DthEGuardian')
            .addChoice('DthPigman', 'ts_DthPigman')
            .addChoice('KillStray', 'ts_KillStray')
            .addChoice('Swim', 'ts_Swim')
            .addChoice('KillCreeper', 'ts_KillCreeper')
            .addChoice('DthRabbit', 'ts_DthRabbit')
            .addChoice('MineGold', 'ts_MineGold')
            .addChoice('Climb', 'ts_Climb')
            .addChoice('MineDiamond', 'hc_MineDiamond')
            .addChoice('KillZombie', 'ts_KillZombie')
            .addChoice('DthVex', 'ts_DthVex')
            .addChoice('MineDDiamond', 'hc_MineDDiamond')
            .addChoice('KillEvoker', 'ts_KillEvoker')
            .addChoice('BreakShovel', 'ts_BreakShovel')
            .addChoice('MineOre', 'hc_MineOre')
            .addChoice('DthPuffish', 'ts_DthPuffish')
            .addChoice('MineSEmerald', 'hc_MineSEmerald')
            .addChoice('DthMagmaCube', 'ts_DthMagmaCube')
            .addChoice('KillPolarBear', 'ts_KillPolarBear')
            .addChoice('MineSGold', 'hc_MineSGold')
            .addChoice('BreakNAxe', 'ts_BreakNAxe')
            .addChoice('DthHusk', 'ts_DthHusk')
            .addChoice('DthStrider', 'ts_DthStrider')
            .addChoice('KillMooshroom', 'ts_KillMooshroom')
            .addChoice('KillSkeleton', 'ts_KillSkeleton')
            .addChoice('MineRedstone', 'hc_MineRedstone')
            .addChoice('TuneNoteblock', 'ts_TuneNoteblock')
            .addChoice('DthCreeper', 'ts_DthCreeper')
            .addChoice('DthVillager', 'ts_DthVillager')
            .addChoice('MineDRedstone', 'ts_MineDRedstone')
            .addChoice('HorseRode', 'ts_HorseRode')
            .addChoice('EnchantItem', 'ts_EnchantItem')
            .addChoice('KillStrider', 'ts_KillStrider')
            .addChoice('DthSlime', 'ts_DthSlime')
            .addChoice('MineSRedstone', 'hc_MineSRedstone')
            .addChoice('KillPhantom', 'ts_KillPhantom')
            .addChoice('VillagerTrade', 'ts_VillagerTrade')
            .addChoice('MineDCoal', 'hc_MineDCoal')
            .addChoice('PlayTime', 'ts_PlayTime')
            .addChoice('KillTraderLla', 'ts_KillTraderLla')
            .addChoice('MineIron', 'hc_MineIron')
            .addChoice('DthIllusion', 'ts_DthIllusion')
            .addChoice('DthShulker', 'ts_DthShulker')
            .addChoice('Jump', 'ts_Jump')
            .addChoice('KillWither', 'ts_KillWither')
            .addChoice('MineDGold', 'ts_MineDGold')
            .addChoice('UseWatrBucket', 'ts_UseWatrBucket')
            .addChoice('KillFox', 'ts_KillFox')
            .addChoice('MineDLapis', 'hc_MineDLapis')
            .addChoice('KillRavager', 'ts_KillRavager')
            .addChoice('MineDiamond', 'ts_MineDiamond')
            .addChoice('KillWandering', 'ts_KillWandering')
            .addChoice('DthIronGolem', 'ts_DthIronGolem')
            .addChoice('CraftShulkBox', 'ts_CraftShulkBox')
            .addChoice('MineNetherite', 'ts_MineNetherite')
            .addChoice('DthEndermite', 'ts_DthEndermite')
            .addChoice('MineDiamondShow', 'hc_MineDiamondShow')
            .addChoice('LastDeath', 'ts_LastDeath')
            .addChoice('swimKmShow', 'hc_swimKmShow')
            .addChoice('UseEnderPearl', 'ts_UseEnderPearl')
            .addChoice('KillAxolotl', 'ts_KillAxolotl')
            .addChoice('DthWolf', 'ts_DthWolf')
            .addChoice('KillPillager', 'ts_KillPillager')
            .addChoice('Brewing', 'ts_Brewing')
 */