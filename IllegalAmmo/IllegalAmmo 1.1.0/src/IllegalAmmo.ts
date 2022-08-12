/* eslint-disable @typescript-eslint/naming-convention */
import { container, DependencyContainer } from "tsyringe";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
import { Item } from "@spt-aki/models/eft/common/tables/IItem";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";

const debug = false;
import * as DarkWebAmmoTrader from "../db/DarkWebAmmoTrader.json";
import { ILocaleGlobalBase } from "@spt-aki/models/spt/server/ILocaleBase";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";

class ILLEGALAmmo implements IPostAkiLoadMod, IPostDBLoadMod, IPreAkiLoadMod
{
    mod: string;
    private modConfig = require("../config/config.json");
    constructor()
    {
        this.mod = "skybellrock-IllegalAmmo";
    }

    
    public preAkiLoad(container: DependencyContainer): void 
    {
        // get logger
        const logger = container.resolve<ILogger>("WinstonLogger");
        
        this.registerProfileImage(container);

        this.setupTraderUpdateTime(container);

        logger.logWithColor("Loading: Illegal AMMO", LogTextColor.cyan);
    }
	
    public postDBLoad(container: DependencyContainer): void 
    {

        var CreateAssortTable = this.createAssortTable();
        const AmmoID: string[] = [/*0*/ "7.62x25mm TT ILLEGAL",/*1*/ ".45 ACP ILLEGAL",/*2*/ "9x39mm ILLEGAL gs",/*3*/ "9x18mm PM ILLEGAL gzh",/*4*/ "9x19mm ILLEGAL",/*5*/ "5.7x28mm ILLEGAL",/*6*/ "9x21mm ILLEGAL gzh",/*7*/ "4.6x30mm ILLEGAL SX",/*8*/ "7.62x39mm ILLEGAL",/*9*/ "5.45x39mm ILLEGAL gs",/*10*/ "5.56x45mm ILLEGAL",/*11*/ ".300 Blackout ILLEGAL",/*12*/ ".366 TKM ILLEGAL",/*13*/ ".357 Magnum ILLEGAL",/*14*/ "7.62x51mm ILLEGAL",/*15*/ "12.7x55mm PS12I",/*16*/ "7.62x54mm R ILLEGAL gzh",/*17*/ "23x75mm ILLEGAL slug",/*18*/ "26x75mm signal flare of death (green)",/*19*/ "26x75mm signal flare of flex (red)",/*20*/ "12/70mm ILLEGAL buckshot",/*21*/ "20/70mm ILLEGAL buckshot",/*22*/ ".338 Lapua Magnum ILLEGAL",/*23*/ "40x46mm ILLEGAL (HE) grenade"];
        const CalibreGroup: string[] = [/*0*/ "Small Calibre",/*1*/ "Medium Calibre",/*2*/ "Large Calibre",/*3*/ "Special Calibre"];
        const HandbookID = "5b47574386f77428ca22b33b";
        const ContainerBlacklistID = "5448bf274bdc2dfc2f8b456a";
        const AdvAmmoConfigGroup = this.modConfig["Advanced Ammunition Config"];


		
		
			//Define Ammo Start
        this.showCaliber();
		
				//Calibre Category
			//Small

        //7.62x25mm TT ILLEGAL
        this.CreateLootTables(AmmoID[0], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[0]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[0], CalibreGroup[0], 1);
        this.addToHandbook(HandbookID, AmmoID[0], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[0], CalibreGroup[0]);
        this.addToLocale(AmmoID[0], "7.62x25mm TT ILLEGAL", "ILLEGAL", "A powerful spray and pray bullet.");
        this.cloneAmmo("5735fdcd2459776445391d61", AmmoID[0], CalibreGroup[0]);
        this.addToChambersMags("Caliber762x25TT", AmmoID[0]);

        //.45 ACP ILLEGAL
        this.CreateLootTables(AmmoID[1], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[1]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[1], CalibreGroup[0], 2);
        this.addToHandbook(HandbookID, AmmoID[1], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[1], CalibreGroup[0]);
        this.addToLocale(AmmoID[1], ".45 ACP ILLEGAL", "ILLEGAL", "Leg meta? More like body meta.");
        this.cloneAmmo("5ea2a8e200685063ec28c05a", AmmoID[1], CalibreGroup[0]);
        this.addToChambersMags("Caliber1143x23ACP", AmmoID[1]);
		
        //9x39mm ILLEGAL gs
        this.CreateLootTables(AmmoID[2], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[2]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[2], CalibreGroup[0], 2);
        this.addToHandbook(HandbookID, AmmoID[2], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[2], CalibreGroup[0]);
        this.addToLocale(AmmoID[2], "9x39mm ILLEGAL gs", "ILLEGAL", "The enemy won't hear it coming, literally.");
        this.cloneAmmo("5c0d688c86f77413ae3407b2", AmmoID[2], CalibreGroup[0]);
        this.addToChambersMags("Caliber9x39", AmmoID[2]);

        //9x18mm PM ILLEGAL gzh
        this.CreateLootTables(AmmoID[3], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[3]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[3], CalibreGroup[0], 1);
        this.addToHandbook(HandbookID, AmmoID[3], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[3], CalibreGroup[0]);
        this.addToLocale(AmmoID[3], "9x18mm PM ILLEGAL gzh", "ILLEGAL", "Leg meta unlocked.");
        this.cloneAmmo("573718ba2459775a75491131", AmmoID[3], CalibreGroup[0]);
        this.addToChambersMags("Caliber9x18PM", AmmoID[3]);

        //9x19mm ILLEGAL
        this.CreateLootTables(AmmoID[4], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[4]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[4], CalibreGroup[0], 2);
        this.addToHandbook(HandbookID, AmmoID[4], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[4], CalibreGroup[0]);
        this.addToLocale(AmmoID[4], "9x19mm ILLEGAL", "ILLEGAL", "Pew pew.");
        this.cloneAmmo("5efb0da7a29a85116f6ea05f", AmmoID[4], CalibreGroup[0]);
        this.addToChambersMags("Caliber9x19PARA", AmmoID[4]);
        this.addToCylinder("624c3074dbbd335e8e6becf3", AmmoID[4]);
		
        //5.7x28mm ILLEGAL
        this.CreateLootTables(AmmoID[5], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[5]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[5], CalibreGroup[0], 1);
        this.addToHandbook(HandbookID, AmmoID[5], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[5], CalibreGroup[0]);
        this.addToLocale(AmmoID[5], "5.7x28mm ILLEGAL", "ILLEGAL", "Might be difficult to get a gun that can use this early-mid game, but this absolutely slaps if you can get a gun for it.");
        this.cloneAmmo("5cc86832d7f00c000d3a6e6c", AmmoID[5], CalibreGroup[0]);
        this.addToChambersMags("Caliber57x28", AmmoID[5]);

        //9x21mm ILLEGAL gzh
        this.CreateLootTables(AmmoID[6], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[6]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[6], CalibreGroup[0], 1);
        this.addToHandbook(HandbookID, AmmoID[6], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[6], CalibreGroup[0]);
        this.addToLocale(AmmoID[6], "9x21mm ILLEGAL gzh", "ILLEGAL", "Has a fantastic selection of guns to be used with.");
        this.cloneAmmo("5a269f97c4a282000b151807", AmmoID[6], CalibreGroup[0]);
        this.addToChambersMags("Caliber9x21", AmmoID[6]);
		
        //4.6x30mm ILLEGAL SX
        this.CreateLootTables(AmmoID[7], AdvAmmoConfigGroup[CalibreGroup[0]][AmmoID[7]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[7], CalibreGroup[0], 2);
        this.addToHandbook(HandbookID, AmmoID[7], CalibreGroup[0]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[7], CalibreGroup[0]);
        this.addToLocale(AmmoID[7], "4.6x30mm ILLEGAL SX", "ILLEGAL", "Has an inscription on the side of it: \"I SX'd your mom last night.\"");
        this.cloneAmmo("5ba26812d4351e003201fef1", AmmoID[7], CalibreGroup[0]);
        this.addToChambersMags("Caliber46x30", AmmoID[7]);
		
				//Calibre Category
			//Medium

        //7.62x39mm ILLEGAL
        this.CreateLootTables(AmmoID[8], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[8]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[8], CalibreGroup[1], 3);
        this.addToHandbook(HandbookID, AmmoID[8], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[8], CalibreGroup[1]);
        this.addToLocale(AmmoID[8], "7.62x39mm ILLEGAL", "ILLEGAL", "Even more meta.");
        this.cloneAmmo("59e0d99486f7744a32234762", AmmoID[8], CalibreGroup[1]);
        this.addToChambersMags("Caliber762x39", AmmoID[8]);

        //5.45x39mm ILLEGAL gs
        this.CreateLootTables(AmmoID[9], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[9]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[9], CalibreGroup[1], 3);
        this.addToHandbook(HandbookID, AmmoID[9], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[9], CalibreGroup[1]);
        this.addToLocale(AmmoID[9], "5.45x39mm ILLEGAL gs", "ILLEGAL", "A classic made classier.");
        this.cloneAmmo("5c0d5e4486f77478390952fe", AmmoID[9], CalibreGroup[1]);
        this.addToChambersMags("Caliber545x39", AmmoID[9]);
			
        //5.56x45mm ILLEGAL
        this.CreateLootTables(AmmoID[10], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[10]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[10], CalibreGroup[1], 3);
        this.addToHandbook(HandbookID, AmmoID[10], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[10], CalibreGroup[1]);
        this.addToLocale(AmmoID[10], "5.56x45mm ILLEGAL", "ILLEGAL", "Of course 5.45 needs competition.");
        this.cloneAmmo("59e6920f86f77411d82aa167", AmmoID[10], CalibreGroup[1]);
        this.addToChambersMags("Caliber556x45NATO", AmmoID[10]);

        //.300 Blackout ILLEGAL
        this.CreateLootTables(AmmoID[11], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[11]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[11], CalibreGroup[1], 2);
        this.addToHandbook(HandbookID, AmmoID[11], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[11], CalibreGroup[1]);
        this.addToLocale(AmmoID[11], ".300 Blackout ILLEGAL", "ILLEGAL", "Very underrated caliber, this ammo is fantastic!");
        this.cloneAmmo("5fbe3ffdf8b6a877a729ea82", AmmoID[11], CalibreGroup[1]);
        this.addToChambersMags("Caliber762x35", AmmoID[11]);
		
        //.366 TKM ILLEGAL
        this.CreateLootTables(AmmoID[12], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[12]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[12], CalibreGroup[1], 3);
        this.addToHandbook(HandbookID, AmmoID[12], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[12], CalibreGroup[1]);
        this.addToLocale(AmmoID[12], ".366 TKM ILLEGAL", "ILLEGAL", "You will use this fantastic ammo with a shitty old gun, aren't you?");
        this.cloneAmmo("59e655cb86f77411dc52a77b", AmmoID[12], CalibreGroup[1]);
        this.addToChambersMags("Caliber366TKM", AmmoID[12]);
		
        //.357 Magnum ILLEGAL
        this.CreateLootTables(AmmoID[13], AdvAmmoConfigGroup[CalibreGroup[1]][AmmoID[13]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[13], CalibreGroup[1], 2);
        this.addToHandbook(HandbookID, AmmoID[13], CalibreGroup[1]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[13], CalibreGroup[1]);
        this.addToLocale(AmmoID[13], ".357 Magnum ILLEGAL", "ILLEGAL", "Real cowboys need real ammo!");
        this.cloneAmmo("62330b3ed4dc74626d570b95", AmmoID[13], CalibreGroup[1]);
        this.addToChambersMags("Caliber366TKM", AmmoID[13]);
	    this.addToCylinder("619f54a1d25cbd424731fb99", AmmoID[13]);	
        this.addToCylinder("61a4cda622af7f4f6a3ce617", AmmoID[13]);
		
				//Calibre Category
			//Large
			
        //7.62x51mm ILLEGAL
        this.CreateLootTables(AmmoID[14], AdvAmmoConfigGroup[CalibreGroup[2]][AmmoID[14]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[14], CalibreGroup[2], 4);
        this.addToHandbook(HandbookID, AmmoID[14], CalibreGroup[2]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[14], CalibreGroup[2]);
        this.addToLocale(AmmoID[14], "7.62x51mm ILLEGAL", "ILLEGAL", "This bullet can tear a hole through your house.");
        this.cloneAmmo("5a6086ea4f39f99cd479502f", AmmoID[14], CalibreGroup[2]);
        this.addToChambersMags("Caliber762x51", AmmoID[14]);

        //12.7x55mm PS12I
        this.CreateLootTables(AmmoID[15], AdvAmmoConfigGroup[CalibreGroup[2]][AmmoID[15]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[15], CalibreGroup[2], 4);
        this.addToHandbook(HandbookID, AmmoID[15], CalibreGroup[2]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[15], CalibreGroup[2]);
        this.addToLocale(AmmoID[15], "12.7x55mm PS12I", "ILLEGAL", "...And they say size doesn't matter.");
        this.cloneAmmo("5cadf6e5ae921500113bb973", AmmoID[15], CalibreGroup[2]);
        this.addToChambersMags("Caliber127x55", AmmoID[15]);

        //7.62x54mm R ILLEGAL gzh
        this.CreateLootTables(AmmoID[16], AdvAmmoConfigGroup[CalibreGroup[2]][AmmoID[16]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[16], CalibreGroup[2], 4);
        this.addToHandbook(HandbookID, AmmoID[16], CalibreGroup[2]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[16], CalibreGroup[2]);
        this.addToLocale(AmmoID[16], "7.62x54mm R ILLEGAL gzh", "ILLEGAL", "Passes the bar for Shooter Born In heaven. In fact this bullet could probably kill immortals.");
        this.cloneAmmo("5e023d34e8a400319a28ed44", AmmoID[16], CalibreGroup[2]);
        this.addToChambersMags("Caliber762x54R", AmmoID[16]);
		
        //23x75mm "ILLEGAL" slug
        this.CreateLootTables(AmmoID[17], AdvAmmoConfigGroup[CalibreGroup[2]][AmmoID[17]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[17], CalibreGroup[2], 3);
        this.addToHandbook(HandbookID, AmmoID[17], CalibreGroup[2]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[17], CalibreGroup[2]);
        this.addToLocale(AmmoID[17], "23x75mm \"ILLEGAL\" slug", "ILLEGAL", "Now with even more body damage.");
        this.cloneAmmo("5e85aa1a988a8701445df1f5", AmmoID[17], CalibreGroup[2]);
        this.addToChambersMags("Caliber23x75", AmmoID[17]);
		
				//Calibre Category
			//Special

        //26x75mm signal flare of death (green)
        this.CreateLootTables(AmmoID[18], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[18]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[18], CalibreGroup[3], 2);
        this.addToHandbook(HandbookID, AmmoID[18], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[18], CalibreGroup[3]);
        this.addToLocale(AmmoID[18], "26x75mm signal flare of death (green)", "ILLEGAL", "Two words: Death, Flare. What could be cooler?");
        this.cloneAmmo("62389aaba63f32501b1b444f", AmmoID[18], CalibreGroup[3]);
        this.addToChambersMags("Caliber26x75", AmmoID[18]);
			
        /*26x75mm signal flare of flex (red)
        this.CreateLootTables(AmmoID[19], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[19]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[19], CalibreGroup[3], 4);
        this.addToHandbook(HandbookID, AmmoID[19], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[19], CalibreGroup[3]);
        this.addToLocale(AmmoID[19], "26x75mm signal flare of flex (red)", "ILLEGAL", "Let's you dance on your enemy's graves by calling in an airdrop on their dead bodies.");
        this.cloneAmmo("62389ba9a63f32501b1b4451", AmmoID[19], CalibreGroup[3]);
        this.addToChambersMags("Caliber26x75", AmmoID[19]);*/
		
        //12/70mm ILLEGAL buckshot
        this.CreateLootTables(AmmoID[20], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[20]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[20], CalibreGroup[3], 4);
        this.addToHandbook(HandbookID, AmmoID[20], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[20], CalibreGroup[3]);
        this.addToLocale(AmmoID[20], "12/70mm ILLEGAL buckshot", "ILLEGAL", "Says BOOM. Don't kill yourself.");
        this.cloneAmmo("560d5e524bdc2d25448b4571", AmmoID[20], CalibreGroup[3]);
        this.addToChambersMags("Caliber12g", AmmoID[20]);
        this.addToCylinder("60dc519adf4c47305f6d410d", AmmoID[20]);
        this.addAmmoToAllChambers("5580223e4bdc2d1c128b457f", AmmoID[20]);
		
        //20/70mm ILLEGAL buckshot
        this.CreateLootTables(AmmoID[21], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[21]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[21], CalibreGroup[3], 2);
        this.addToHandbook(HandbookID, AmmoID[21], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[21], CalibreGroup[3]);
        this.addToLocale(AmmoID[21], "20/70mm ILLEGAL buckshot", "ILLEGAL", "We all know the TOZ is the best weapon, but with this ammo it becomes META.");
        this.cloneAmmo("5a38ebd9c4a282000d722a5b", AmmoID[21], CalibreGroup[3]);
        this.addToChambersMags("Caliber20g", AmmoID[21]);

        //.338 Lapua Magnum ILLEGAL
        this.CreateLootTables(AmmoID[22], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[22]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[22], CalibreGroup[3], 4);
        this.addToHandbook(HandbookID, AmmoID[22], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[22], CalibreGroup[3]);
        this.addToLocale(AmmoID[22], ".338 Lapua Magnum ILLEGAL", "ILLEGAL", "Puts a golfball sized hole in your enemies.");
        this.cloneAmmo("5fc382a9d724d907e2077dab", AmmoID[22], CalibreGroup[3]);
        this.addToChambersMags("Caliber86x70", AmmoID[22]);

        //40x46mm ILLEGAL (HE) grenade
        this.CreateLootTables(AmmoID[23], AdvAmmoConfigGroup[CalibreGroup[3]][AmmoID[23]]["Spawn Chance"]);
        this.AddToAssortTable(CreateAssortTable, AmmoID[23], CalibreGroup[3], 4);
        this.addToHandbook(HandbookID, AmmoID[23], CalibreGroup[3]);
        this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[23], CalibreGroup[3]);
        this.addToLocale(AmmoID[23], "40x46mm ILLEGAL (HE) grenade", "ILLEGAL", "Turns enemies into mush.");
        this.cloneAmmo("5ede474b0c226a66f5402622", AmmoID[23], CalibreGroup[3]);
        this.addToChambersMags("Caliber40x46", AmmoID[23]);
        this.addToCylinder("627bce33f21bc425b06ab967", AmmoID[23]);


        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const GenConfig = this.modConfig["General Config"];

			//Define Custom Shrapnel Start
        this.cloneItem("5996f6cb86f774678763a6ca", "Weakest IllegalShrap");
        const WeakestIllegalShrap = db.templates.items["Weakest IllegalShrap"]._props;
        WeakestIllegalShrap.Damage = GenConfig["Weakest Shrapnel Damage"];

        this.cloneItem("5996f6cb86f774678763a6ca", "Weak IllegalShrap");
        const WeakIllegalShrap = db.templates.items["Weak IllegalShrap"]._props;
        WeakIllegalShrap.Damage = GenConfig["Weak Shrapnel Damage"];

        this.cloneItem("5996f6cb86f774678763a6ca", "Medium IllegalShrap");
        const MediumIllegalShrap = db.templates.items["Medium IllegalShrap"]._props;
        MediumIllegalShrap.Damage = GenConfig["Medium Shrapnel Damage"];

        this.cloneItem("5996f6cb86f774678763a6ca", "Strong IllegalShrap");
        const StrongIllegalShrap = db.templates.items["Strong IllegalShrap"]._props;
        StrongIllegalShrap.Damage = GenConfig["Strong Shrapnel Damage"];

        this.cloneItem("5996f6cb86f774678763a6ca", "Strongest IllegalShrap");
        const StrongestIllegalShrap = db.templates.items["Strongest IllegalShrap"]._props;
        StrongestIllegalShrap.Damage = GenConfig["Strongest Shrapnel Damage"];
            //Define Custom Shrapnel End

        if (debug) console.log("Handbook");
        if (debug) console.log(db.templates.handbook.Items.find(e => e.Id == "7.62x25mm TT ILLEGAL"));
        if (debug) console.log("Locale");
        if (debug) console.log(db.locales.global.en.templates["7.62x25mm TT ILLEGAL"]);
			//Define Ammo End
			

        db.traders[DarkWebAmmoTrader._id] =
        {
            assort: CreateAssortTable,
            base: JsonUtil.deserialize(JsonUtil.serialize(DarkWebAmmoTrader)) as ITraderBase,
            questassort: undefined
        }

        const traderLocales = Object.values(db.locales.global) as ILocaleGlobalBase[];
        for (const locale of traderLocales)
        {
            locale.trading[DarkWebAmmoTrader._id] =
            {
                FullName: DarkWebAmmoTrader.name,
                FirstName: "WEB",
                Nickname: DarkWebAmmoTrader.nickname,
                Location: DarkWebAmmoTrader.location,
                Description: "The dark web is a great place to sell ammunition for a good price, and contains useful Illegal ammo. Illegal ammo often have more destructive power,and funny descriptions, but is also more unstable and can cause your gun to overheat, malfunction or wear down at a faster rate than regulated ammo."
            }
        }
			
        //this.showWeaponMod()

    }


        //Creating Simple Functions Start
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public postAkiLoad(container: DependencyContainer): void 
    {
        //   
    }
    private addToHandbook(HandbookID:string, AmmoID:string, Calibre:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const Price = this.modConfig["Advanced Ammunition Config"][Calibre][AmmoID]["Sell Price"];
        db.templates.handbook.Items.push(
            {

                "Id": AmmoID,
                "ParentId": HandbookID,
                "Price": Price

            }
        )
    }

    private addToLocale(id:string, name:string, shortname:string, description:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables(); 
        const locales = db.locales.global.en;
        locales.templates[id] =
            {
                "Name": name,
                "ShortName": shortname,
                "Description": description
            }
    }

    addToCylinder(itemId: string, ammoToAdd: string) 	
    {	
        const logger = container.resolve<ILogger>("WinstonLogger");	
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();	
        const weaponID = db.templates.items[itemId];	
        for (const index in weaponID._props.Slots)	
        {	
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan");	
            const z_Filter = weaponID._props.Slots[index]._props.filters[0].Filter;	
            z_Filter.push.apply(z_Filter, [ammoToAdd]);	
            const newFilters = [	
                {	
                    Filter: z_Filter,	
                    ExcludedFilter: []	
                }	
            ]	
            weaponID._props.Slots[index]._props.filters = newFilters;
        }	
        for (const index in weaponID._props.Cartridges)
        {	
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan");
            const z_Filter = weaponID._props.Cartridges[index]._props.filters[0].Filter;	
            z_Filter.push.apply(z_Filter, [ammoToAdd]);	
            const newFilters = [	
                {	
                    Filter: z_Filter,	
                    ExcludedFilter: []	
                }	
            ]	
            weaponID._props.Cartridges[index]._props.filters = newFilters;	
        }
        	
    }

    private addAmmoToAllMags(caliber:string, ammo:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Chambers != undefined && db.templates.items[item]._props.ammoCaliber == caliber)
            {
                if (debug) console.log(item);
                for (const slotIndex in db.templates.items[item]._props.Slots)
                {
                    if (db.templates.items[item]._props.Slots[slotIndex]._name == "mod_magazine")
                    {
                        for (const mags in db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter)
                        {
                            if (debug) console.log("Magazine: " + db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags]);
                            this.addToMagazine(db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags], ammo);    
                        }
                        
                    }
                }
                
            }
        }
    }

    private addToWeaponChamber(weapon:string, ammoToAdd:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const weaponID = db.templates.items[weapon];
        if (weaponID._props.Chambers?.[0]?._props != undefined)
        {
	            for (const index in weaponID._props.Chambers)	
            {	
                if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items[weapon]._name, "cyan")	
                const z_Filter = weaponID._props.Chambers[index]._props.filters[0].Filter;	
                z_Filter.push.apply(z_Filter, [ammoToAdd]);	
                const newFilters = [	
                    {	
                        Filter: z_Filter,	
                        ExcludedFilter: []	
                    }	
                ]	
                weaponID._props.Chambers[0]._props.filters = newFilters;	
            }
        }
        //if (debug) logger.log(newFilters, "cyan");
    }

    private addToMagazine(magazine:string, ammoToAdd:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
	        //logger.logWithColor(magazine, LogTextColor.green);	
        if (db.templates.items[magazine] != undefined)
        {
            const magazineID = db.templates.items[magazine];
            //logger.logWithColor(db.templates.items[magazine]._id, LogTextColor.red)
            if (magazineID._props.Cartridges?.[0]?._props != undefined)
            {
                if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items[magazine]._name, "cyan")
	                const z_Filter = magazineID._props.Cartridges[0]._props.filters[0].Filter;
                z_Filter.push.apply(z_Filter, [ammoToAdd]);
                const newFilters = [
                    {
                        Filter: z_Filter,
                        ExcludedFilter: []
                    }
                ];
	            logger.logWithColor(magazineID._name, LogTextColor.green);	
                logger.logWithColor(ammoToAdd, LogTextColor.yellow)
                magazineID._props.Cartridges[0]._props.filters = newFilters;
            }
			
        }
		
        //if (debug) logger.log(newFilters, "red");
    }

    private addToSlot(id:string, ammoToAdd:string)	
    {	
        const logger = container.resolve<ILogger>("WinstonLogger");	
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();	
        const weaponOrMagID = db.templates.items[id];	
        if (weaponOrMagID._props.Slots != undefined && weaponOrMagID._id != "60db29ce99594040e04c4a27" && weaponOrMagID._id != "624c2e8614da335f1e034d8c" && weaponOrMagID._id != "61a4c8884f95bc3b2c5dc96f")	
        {	
            if (weaponOrMagID._props.Slots?.[0]?._props != undefined)	
            {	
                for (const index in weaponOrMagID._props.Slots)	
                {	
                    if (debug) logger.log("Adding " + ammoToAdd + " to " + db.templates.items.weaponOrMagID._name, "cyan")	
                    const z_Filter = weaponOrMagID._props.Slots[index]._props.filters[0].Filter;	
                    z_Filter.push.apply(z_Filter, [ammoToAdd]);	
                    const newFilters = [	
                        {	
                            Filter: z_Filter,	
                            ExcludedFilter: []	
                        }	
                    ];	
                    weaponOrMagID._props.Slots[index]._props.filters = newFilters;	
                }	
            }	
        }	
    }

    private addAmmoToAllChambers(caliber:string, ammo:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Chambers != undefined && db.templates.items[item]._props.ammoCaliber == caliber)
            {

                this.addToWeaponChamber(db.templates.items[item]._id, ammo);
            }
        }
    }

    private addAmmoToAllSlots(caliber:string, ammo:string)	
    {	
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();	
        for (const item in db.templates.items)	
        {	
            if (db.templates.items[item]._props.Slots != undefined && db.templates.items[item]._props.ammoCaliber == caliber)	
            {	
                this.addToSlot(db.templates.items[item]._id, ammo);	
            }	
        }	
    }

    private showWeaponMod()
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const newArray = [];
        for (const item in db.templates.items)
        {
            if (db.templates.items[item]._props.Slots != undefined)
            {   
                for (const slot in db.templates.items[item]._props.Slots)
                {
                    if (newArray.includes(db.templates.items[item]._props.Slots[slot]._name))
                    {
                        //
                    }
                    else
                    {
                        newArray.push(db.templates.items[item]._props.Slots[slot]._name);
                    }
                }
                
            }
        }
        logger.logWithColor("Weapon Slot Names", LogTextColor.cyan);
        logger.logWithColor(newArray, LogTextColor.red);
    }

    private showCaliber()
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const ILLEGALArray = [];
        for (const item in db.templates.items)
        {
            
            if (db.templates.items[item]._props.ammoCaliber != undefined)
            {   
                //console.log(db.templates.items[item]._props.ammoCaliber);
                if (ILLEGALArray.includes(db.templates.items[item]._props.ammoCaliber))
                {
                    //console.log("AlreadyInList");
                }
                else
                {
                    ILLEGALArray.push(db.templates.items[item]._props.ammoCaliber);
                    //console.log("hi");
                }
            }
        }
        if (debug) logger.logWithColor("Ammo Calibers", LogTextColor.green);
        if (debug) logger.logWithColor(ILLEGALArray, LogTextColor.red);
    }

            //Remove Ammo From Secured Containers Start
    private addToContainerBlacklist(ContainerBlacklistID:string, AmmoID:string, Calibre:string)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");	
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();	
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Calibre][AmmoID];
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];
        const Bool = ["true", "false"];
        for (let id in db.templates.items)
        {
            if (Bool.includes(AdvAmmoConfig["Removed From Secured Container"]))
            {
                if (db.templates.items[id]._parent == ContainerBlacklistID)
                {
                    db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                }
            }
            else
            {
                if (Bool.includes(SimAmmoConfig["Remove ALL From Secured Container"]))
                {
                    if (db.templates.items[id]._parent == ContainerBlacklistID)
                    {
                        db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                    }
                }
                else
                {
                    logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Remove ALL From Secured Container\" AND \"Advanced Ammunition Config\" → \""+String(Calibre)+"\" → \""+String(AmmoID)+"\" → \"Removed From Secured Container\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.red);	
                    if (db.templates.items[id]._parent == ContainerBlacklistID)
                    {
                        db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                    }
                }
            }
        }
    }
    //CHECK Simplify ID, ARRAY OF ID'S TO APPLY TO?
    private CreateLootTables(AmmoID:string, Chance:number)
    {
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];

        const JaegersStash =  "5d07b91b86f7745a077a9432";
        const Safe = "578f8782245977354405a1e3";
        const PlasticSuitcase = "5c052cea86f7746b2101e8d8";
        const Jacket214 = "5914944186f774189e5e76c2";

        const DeadScav = "5909e4b686f7747f5b744fa4";
        const WoodenAmmoBox = "5909d45286f77465a8136dc6";

        const BurriedBarrelStash = "5d6d2bb386f774785b07a77a";
        const GroundCache = "5d6d2b5486f774785c2ba8ea";
        const WoodenCrate = "578f87ad245977356274f2cc";

        const PistolCrate = "5909d7cf86f77470ee57d75a";
        const WeaponCrate = "5909d5ef86f77467974efbd8";
        const LargePistolCrate = "5909d89086f77472591234a0";
        const LargeWeaponCrate = "5909d76c86f77471e53d2adf";
        const SportBag = "578f87a3245977356274f2cb";
        const Jacket = "578f8778245977358849a9b5";
        

        this.addToStaticLoot(JaegersStash, AmmoID, Chance * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(Safe, AmmoID, Chance * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(PlasticSuitcase, AmmoID, Chance * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(Jacket214, AmmoID, Chance * SimAmmoConfig["Spawn Chance Multiplier"]);

        this.addToStaticLoot(DeadScav, AmmoID, Chance / 3 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(WoodenAmmoBox, AmmoID, Chance / 3 * SimAmmoConfig["Spawn Chance Multiplier"]);

        this.addToStaticLoot(BurriedBarrelStash, AmmoID, Chance / 6 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(GroundCache, AmmoID, Chance / 6 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(WoodenCrate, AmmoID, Chance / 6 * SimAmmoConfig["Spawn Chance Multiplier"]);

        this.addToStaticLoot(PistolCrate, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(WeaponCrate, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(LargePistolCrate, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(LargeWeaponCrate, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(SportBag, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
        this.addToStaticLoot(Jacket, AmmoID, Chance / 10 * SimAmmoConfig["Spawn Chance Multiplier"]);
    }
            //Remove Ammo From Secured Containers End
    private addToStaticLoot(containerID:string, itemToAdd:string, probablity:number)
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();

        const lootContainter = db.loot.staticLoot[containerID];
        const lootDistr = lootContainter.itemDistribution;
        
        const newLoot = [
            {
                tpl: itemToAdd,
                relativeProbability: probablity
            }
        ]
        for (const lootItem of newLoot)
        {
            lootDistr.push.apply(lootDistr, [lootItem]);
        }
        lootContainter.itemDistribution = lootDistr;
        //if (debug) logger.log([lootContainter], "green");
    }
			//Creating Simple Functions End
			
			

		
		//future automation
		//Small Calibre
		/*ammoID._props.MisfireChance = SmallEquationResult;
        ammoID._props.MalfMisfireChance = SmallEquationResult;
        ammoID._props.DurabilityBurnModificator = SmallEquationResult;
        ammoID._props.HeatFactor = SmallEquationResult;
        ammoID._props.MalfFeedChance = SmallEquationResult;*/
		//Medium Calibre
		/*ammoID._props.MisfireChance = MediumEquationResult;
        ammoID._props.MalfMisfireChance = MediumEquationResult;
        ammoID._props.DurabilityBurnModificator = MediumEquationResult;
        ammoID._props.HeatFactor = MediumEquationResult;
        ammoID._props.MalfFeedChance = MediumEquationResult;*/
		//Large Calibre
		/*ammoID._props.MisfireChance = LargeEquationResult;
        ammoID._props.MalfMisfireChance = LargeEquationResult;
        ammoID._props.DurabilityBurnModificator = LargeEquationResult;
        ammoID._props.HeatFactor = LargeEquationResult;
        ammoID._props.MalfFeedChance = LargeEquationResult;*/
		//Special Calibre
		/*ammoID._props.MisfireChance = SpecialEquationResult;
        ammoID._props.MalfMisfireChance = SpecialEquationResult;
        ammoID._props.DurabilityBurnModificator = SpecialEquationResult;
        ammoID._props.HeatFactor = SpecialEquationResult;
        ammoID._props.MalfFeedChance = SpecialEquationResult;*/
			
        //CHECK ADD FUNCTIONS FOR CHANCE AND ADVANCED STATS

        /*function Test(:type) {
            
        }*/
			
			//Define Ammo Stats Start
	private cloneAmmo(AmmoToClone:string, AmmoID:string, Calibre:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(AmmoToClone, AmmoID);
        const ammoID = db.templates.items[AmmoID];
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Calibre][AmmoID];
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];
        const GenConfig = this.modConfig["General Config"];
        const GlobalMultiplier = SimAmmoConfig["All Stats Multiplier"];
        const Colors = ["blue", "yellow", "green", "red", "black", "grey", "violet", "orange", "tracerYellow", "tracerGreen", "tracerRed"];
        const Bool = ["true", "false"];


        if (Colors.includes(AdvAmmoConfig["Icon Color"]))
        {
            ammoID._props.BackgroundColor = AdvAmmoConfig["Icon Color"];
        }
        else
        {
            if (Colors.includes(SimAmmoConfig["Icon Color"]))
            {
                ammoID._props.BackgroundColor = SimAmmoConfig["Icon Color"];
            }
            else
            {
                logger.logWithColor("ERROR: NO BACKGROUND COLOR OPTION FOUND FOR "+String(AmmoID)+" IN config.json ENTRIES: \"Simple Ammunition Config\" → \"Icon Color\" OR \"Advanced Ammunition Config\" → \""+String(Calibre)+"\" → \""+String(AmmoID)+"\" → \"Icon Color\". DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO ANY OF THESE COLORS \"blue\", \"yellow\", \"green\", \"red\", \"black\", \"grey\", \"violet\", \"orange\", \"tracerYellow\", \"tracerGreen\" OR \"tracerRed\" PARANTHESIS INCLUDED, AND THE LATTER TO ANY DESIRED COLOR FOR THAT SPECIFIC AMMO, OR \"\" TO USE THE COLOR FROM \"Simple Ammunition Config\".", LogTextColor.red);	
                ammoID._props.BackgroundColor = "red";
            }
        }
        
        if (Bool.includes(AdvAmmoConfig["Removed From Flea Market"]))
        {
            ammoID._props.CanSellOnRagfair = !this.CastBool(AdvAmmoConfig["Removed From Flea Market"]); 
        }
        else
        {
            if (Bool.includes(SimAmmoConfig["Remove ALL From Flea Market"]))
            {
                ammoID._props.CanSellOnRagfair = !this.CastBool(SimAmmoConfig["Remove ALL From Flea Market"]);
            }
            else
            {
                logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Remove ALL From Flea Market\" AND \"Advanced Ammunition Config\" → \""+String(Calibre)+"\" → \""+String(AmmoID)+"\" → \"Removed From Flea Market\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.red);	
                ammoID._props.CanSellOnRagfair = !true;
            }
        }

        if (Bool.includes(AdvAmmoConfig["Tracer On"]))
        {
            ammoID._props.Tracer = this.CastBool(AdvAmmoConfig["Tracer On"]); 
        }
        else
        {
            if (Bool.includes(SimAmmoConfig["Tracer On"]))
            {
                ammoID._props.Tracer = this.CastBool(SimAmmoConfig["Tracer On"]);
            }
            else
            {
                logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Tracer On\" AND \"Advanced Ammunition Config\" → \""+String(Calibre)+"\" → \""+String(AmmoID)+"\" → \"Removed From Flea Market\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.red);	
                ammoID._props.Tracer = true;
            }
        }

        if (Colors.includes(AdvAmmoConfig["Tracer Color"]))
        {
            ammoID._props.TracerColor = AdvAmmoConfig["Tracer Color"];
        }
        else
        {
            if (Colors.includes(SimAmmoConfig["Tracer Color"]))
            {
                ammoID._props.TracerColor = SimAmmoConfig["Tracer Color"];
            }
            else
            {
                logger.logWithColor("ERROR: NO COLOR OPTION FOUND FOR "+String(AmmoID)+" IN config.json ENTRIES: \"Simple Ammunition Config\" → \"Tracer Color\" OR \"Advanced Ammunition Config\" → \""+String(Calibre)+"\" → \""+String(AmmoID)+"\" → \"Tracer Color\". DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO ANY OF THESE COLORS \"blue\", \"yellow\", \"green\", \"red\", \"black\", \"grey\", \"violet\", \"orange\", \"tracerYellow\", \"tracerGreen\" OR \"tracerRed\" PARANTHESIS INCLUDED, AND THE LATTER TO ANY DESIRED COLOR FOR THAT SPECIFIC AMMO, OR \"\" TO USE THE COLOR FROM \"Simple Ammunition Config\".", LogTextColor.red);	
                ammoID._props.TracerColor = "tracerRed";
            }
        }
        //CHECK ADD DAMAGE PER PELLET SUPPORT TEMP REMOVED FROM CONFIG
        ammoID._props.Damage = AdvAmmoConfig["Damage"] * (SimAmmoConfig["Damage Multiplier"] * GlobalMultiplier);
        ammoID._props.PenetrationPower = AdvAmmoConfig["Armor Penetration"] * (SimAmmoConfig["Armor Penetration Multiplier"] * GlobalMultiplier);
        ammoID._props.ArmorDamage = AdvAmmoConfig["Damage To Armor"] * (SimAmmoConfig["Damage To Armor Multiplier"] * GlobalMultiplier);
        ammoID._props.ammoAccr = AdvAmmoConfig["Accuracy"] * (SimAmmoConfig["Accuracy Multiplier"] * GlobalMultiplier);
        ammoID._props.ammoRec = AdvAmmoConfig["Recoil"] * (SimAmmoConfig["Recoil Multiplier"] * GlobalMultiplier);
        ammoID._props.FragmentationChance = AdvAmmoConfig["Fragmentation Chance"] * (SimAmmoConfig["Fragmentation Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.RicochetChance = AdvAmmoConfig["Ricochet Chance"] * (SimAmmoConfig["Ricochet Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.LightBleedingDelta = AdvAmmoConfig["Light Bleed Chance"] * (SimAmmoConfig["Light Bleed Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.HeavyBleedingDelta = AdvAmmoConfig["Heavy Bleed Chance"] * (SimAmmoConfig["Heavy Bleed Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.InitialSpeed = AdvAmmoConfig["Bullet Velocity"] * (SimAmmoConfig["Bullet Velocity Multiplier"] * GlobalMultiplier);
	    ammoID._props.MisfireChance = AdvAmmoConfig["Misfire Chance"] * (SimAmmoConfig["Misfire Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.MalfMisfireChance = AdvAmmoConfig["Misfire Chance"] * (SimAmmoConfig["Misfire Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.MalfFeedChance = AdvAmmoConfig["Failure To Feed Chance"] * (SimAmmoConfig["Failure To Feed Chance Multiplier"] * GlobalMultiplier);
        ammoID._props.DurabilityBurnModificator = AdvAmmoConfig["Durability Burn"] * (SimAmmoConfig["Durability Burn Multiplier"] * GlobalMultiplier);
        ammoID._props.HeatFactor = AdvAmmoConfig["Heat"] * (SimAmmoConfig["Heat Multiplier"] * GlobalMultiplier);

        ammoID._props.buckshotBullets = AdvAmmoConfig["buckshot Pellets"];
        ammoID._props.ProjectileCount = AdvAmmoConfig["buckshot Pellets"];
        ammoID._props.HasGrenaderComponent = this.CastBool(AdvAmmoConfig["Explosive"]);
        ammoID._props.ShowHitEffectOnExplode = true;
        ammoID._props.FragmentsCount = AdvAmmoConfig["Fragments"];
        ammoID._props.FragmentType = AdvAmmoConfig["Fragment Type"];
        ammoID._props.ExplosionType = "big_round_impact_explosive";
        ammoID._props.MinExplosionDistance = AdvAmmoConfig["Minimum Explosion Distance"];
        ammoID._props.MaxExplosionDistance = AdvAmmoConfig["Maximum Explosion Distance"];

        ammoID._props.RagFairCommissionModifier = GenConfig["Flea Market Fee Multiplier"];
		ammoID._props.TracerDistance = AdvAmmoConfig["Tracer Length"] * (SimAmmoConfig["Tracer Length Multiplier"] * GlobalMultiplier);
        ammoID._props.Finallowed = this.CastBool(AdvAmmoConfig["Mod Compatibility"]["Fin's AI Tweaks"]);
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
			//Define Ammo Stats End

            //CHECK FIND SETTING TO INCREASE PRICE ON MARKET ONLY
			
			//Creating Trader Setting Dependencies Start
    private cloneItem(itemtoClone:string, newitemID:string)
    {
        
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const itemToAdd = newitemID;
        db.templates.items[itemToAdd] = JsonUtil.clone(db.templates.items[itemtoClone]);
        db.templates.items[itemToAdd]._id = itemToAdd;
        
        if (debug) logger.logWithColor(db.templates.items[itemtoClone]._name + " cloned", LogTextColor.green);
    }

    private registerProfileImage(container: DependencyContainer): void 
    {
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageFilepath = `./${preAkiModLoader.getModPath(this.mod)}res`;

        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(DarkWebAmmoTrader.avatar.replace(".png", ""), `${imageFilepath}/DarkWebAMMO.png`);
    }

    private setupTraderUpdateTime(container: DependencyContainer): void 
    {
        const GenConfig = this.modConfig["General Config"];
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = {traderId: DarkWebAmmoTrader._id, seconds: GenConfig["Trader Refresh In Seconds"]};
        traderConfig.updateTime.push(traderRefreshConfig);
    }

    private addToChambersMags(caliber:string, ammoToAdd:string)
    {
        this.addAmmoToAllMags(caliber, ammoToAdd);
        this.addAmmoToAllChambers(caliber, ammoToAdd);
    }
            //Creating Trader Setting Dependencies End


    private createAssortTable(): ITraderAssort
    {
        const AssortTable: ITraderAssort = {
                  items: [],
                   barter_scheme: {},
                   loyal_level_items: {}
               }
               return AssortTable;
    }
    
    private AddToAssortTable(Itrade:ITraderAssort ,AmmoID:string, Calibre:string, DefaultLoyaltyLevel:number): ITraderAssort
    {
            const logger = container.resolve<ILogger>("WinstonLogger");
            const ROUBLE_ID = "5449016a4bdc2d6f028b456f";
            const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Calibre][AmmoID];
            const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];


            const new762x25mmTTILLEGAL: Item = {
                _id: AmmoID,
                _tpl: AmmoID,
                parentId: "hideout",
                slotId: "hideout",
                upd: {
                    UnlimitedCount: true,
                    StackObjectsCount: 999999999,
			    	BuyRestrictionMax: AdvAmmoConfig["Buy Restriction Amount"] * SimAmmoConfig["Buy Restriction Amount Multiplier"],
			    	BuyRestrictionCurrent: 0
                }
            };

            Itrade.items.push(new762x25mmTTILLEGAL);

            Itrade.barter_scheme[AmmoID] = [
                [
                    {
                        count: AdvAmmoConfig["Buy Price"] * SimAmmoConfig["Buy Price Multiplier"],
                        _tpl: ROUBLE_ID
                    }
                ]
            ];

            if ([1, 2, 3, 4].includes(AdvAmmoConfig["Loyalty Level Requirement"]))
            {
                Itrade.loyal_level_items[AmmoID] = AdvAmmoConfig["Loyalty Level Requirement"];
            }
            else
            {
                if ([1, 2, 3, 4].includes(SimAmmoConfig["Loyalty Level Requirement"]))
                {
                    Itrade.loyal_level_items[AmmoID] = SimAmmoConfig["Loyalty Level Requirement"];
                }
                else
                {
                    logger.logWithColor("No manual configuration of \"Loyalty Level Requirement\" found for "+String(AmmoID)+" using default settings.", LogTextColor.blue);	
                    Itrade.loyal_level_items[AmmoID] = DefaultLoyaltyLevel;
                }
            }

                return Itrade;

    }

    private CastBool(InString : String): boolean
    {
    let OutBool=false;
    let StringIn=String(InString).toLowerCase();
    if (StringIn=="true")
    {
        OutBool=true;   
    }
    else
    if (StringIn=="false")
    {
        OutBool=false;   
    }
    return OutBool;
    }
}

    module.exports = { mod: new ILLEGALAmmo() }