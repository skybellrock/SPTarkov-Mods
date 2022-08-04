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
	
			//Define Ammo Start
    public postDBLoad(container: DependencyContainer): void 
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");

        db.traders[DarkWebAmmoTrader._id] =
        {
            assort: this.createAssortTable(),
            base: JsonUtil.deserialize(JsonUtil.serialize(DarkWebAmmoTrader)) as ITraderBase,
            questassort: undefined
        };

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
            };
        }

        this.showCaliber();
        //762x25TT
        this.addToHandbook("ILLEGAL762x25tt", "5b47574386f77428ca22b33b", 2500);
        this.addToLocale("ILLEGAL762x25tt", "7.62x25mm TT ILLEGAL", "ILLEGAL", "A powerful spray and pray bullet.");
        this.clone762x25TT("5735fdcd2459776445391d61", "ILLEGAL762x25tt");
        this.addToChambersMags("Caliber762x25TT", "ILLEGAL762x25tt");
        //1143x23ACP
        this.addToHandbook("ILLEGAL1143x23ACP", "5b47574386f77428ca22b33b", 10000);
        this.addToLocale("ILLEGAL1143x23ACP", ".45 ACP ILLEGAL", "ILLEGAL", "Leg meta? More like body meta.");
        this.clone45ACP("5ea2a8e200685063ec28c05a", "ILLEGAL1143x23ACP");
        this.addToChambersMags("Caliber1143x23ACP", "ILLEGAL1143x23ACP");
        //762x39
        this.addToHandbook("ILLEGAL762x39", "5b47574386f77428ca22b33b", 16000);
        this.addToLocale("ILLEGAL762x39", "7.62x39mm ILLEGAL", "ILLEGAL", "Even more meta.");
        this.clone762x39("59e0d99486f7744a32234762", "ILLEGAL762x39");
        this.addToChambersMags("Caliber762x39", "ILLEGAL762x39");
        //762x51
        this.addToHandbook("ILLEGAL762x51", "5b47574386f77428ca22b33b", 30000);
        this.addToLocale("ILLEGAL762x51", "7.62x51mm ILLEGAL", "ILLEGAL", "This bullet can tear a hole through your house.");
        this.clone762x51("5a6086ea4f39f99cd479502f", "ILLEGAL762x51");
        this.addToChambersMags("Caliber762x51", "ILLEGAL762x51");
        //9x39
        this.addToHandbook("ILLEGAL9x39", "5b47574386f77428ca22b33b", 12000);
        this.addToLocale("ILLEGAL9x39", "9x39mm ILLEGAL gs", "ILLEGAL", "The enemy won't hear it coming, literally.");
        this.clone9x39("5c0d688c86f77413ae3407b2", "ILLEGAL9x39");
        this.addToChambersMags("Caliber9x39", "ILLEGAL9x39");
        //545x39
        this.addToHandbook("ILLEGAL545x39", "5b47574386f77428ca22b33b", 20000);
        this.addToLocale("ILLEGAL545x39", "5.45x39mm ILLEGAL gs", "ILLEGAL", "A classic made classier.");
        this.clone545x39("5c0d5e4486f77478390952fe", "ILLEGAL545x39");
        this.addToChambersMags("Caliber545x39", "ILLEGAL545x39");
        //556x45NATO
        this.addToHandbook("ILLEGAL556x45NATO", "5b47574386f77428ca22b33b", 18000);
        this.addToLocale("ILLEGAL556x45NATO", "5.56x45mm ILLEGAL", "ILLEGAL", "Of course 5.45 needs competition.");
        this.clone556x45NATO("59e6920f86f77411d82aa167", "ILLEGAL556x45NATO");
        this.addToChambersMags("Caliber556x45NATO", "ILLEGAL556x45NATO");
        //127x55
        this.addToHandbook("ILLEGAL127x55", "5b47574386f77428ca22b33b", 25000);
        this.addToLocale("ILLEGAL127x55", "12.7x55mm PS12", "ILLEGAL", "Way too big. Like why? seriously why?");
        this.clone127x55("5cadf6e5ae921500113bb973", "ILLEGAL127x55");
        this.addToChambersMags("Caliber127x55", "ILLEGAL127x55");
        //762x35
        this.addToHandbook("ILLEGAL762x35", "5b47574386f77428ca22b33b", 15000);
        this.addToLocale("ILLEGAL762x35", ".300 Blackout ILLEGAL", "ILLEGAL", "Very underrated caliber, this ammo is fantastic!");
        this.clone762x35("5fbe3ffdf8b6a877a729ea82", "ILLEGAL762x35");
        this.addToChambersMags("Caliber762x35", "ILLEGAL762x35");
        //9x18PM
        this.addToHandbook("ILLEGAL9x18PM", "5b47574386f77428ca22b33b", 4000);
        this.addToLocale("ILLEGAL9x18PM", "9x18mm PM ILLEGAL GZH", "ILLEGAL", "Leg meta unlocked.");
        this.clone9x18PM("573718ba2459775a75491131", "ILLEGAL9x18PM");
        this.addToChambersMags("Caliber9x18PM", "ILLEGAL9x18PM");
        //366TKM
        this.addToHandbook("ILLEGAL366TKM", "5b47574386f77428ca22b33b", 20000);
        this.addToLocale("ILLEGAL366TKM", ".366 TKM ILLEGAL", "ILLEGAL", "You will use this fantastic ammo with a shitty old gun, aren't you?");
        this.clone366TKM("59e655cb86f77411dc52a77b", "ILLEGAL366TKM");
        this.addToChambersMags("Caliber366TKM", "ILLEGAL366TKM");
        //40x46
        this.addToHandbook("ILLEGAL40x46", "5b47574386f77428ca22b33b", 75000);
        this.addToLocale("ILLEGAL40x46", "40x46mm ILLEGAL (HE) grenade", "ILLEGAL", "Turns enemies into mush.");
        this.clone40x46("5ede474b0c226a66f5402622", "ILLEGAL40x46");
        this.addToChambersMags("Caliber40x46", "ILLEGAL40x46");
        //26x75
        this.addToHandbook("ILLEGAL26x75", "5b47574386f77428ca22b33b", 300000);
        this.addToLocale("ILLEGAL26x75", "26x75 flare cartridge of death (red) (flare)", "ILLEGAL", "Two words: Death, Flare. What could be cooler?");
        this.clone26x75("62389aaba63f32501b1b444f", "ILLEGAL26x75");
        this.addToChambersMags("Caliber26x75", "ILLEGAL26x75");
        //762x54R
        this.addToHandbook("ILLEGAL762x54R", "5b47574386f77428ca22b33b", 27500);
        this.addToLocale("ILLEGAL762x54R", "7.62x54mm R ILLEGAL gzh", "ILLEGAL", "Passes the bar for Shooter Born In heaven. In fact this bullet could probably kill angels.");
        this.clone762x54R("5e023d34e8a400319a28ed44", "ILLEGAL762x54R");
        this.addToChambersMags("Caliber762x54R", "ILLEGAL762x54R");
        //86x70
        this.addToHandbook("ILLEGAL86x70", "5b47574386f77428ca22b33b", 50000);
        this.addToLocale("ILLEGAL86x70", ".338 Lapua Magnum ILLEGAL", "ILLEGAL", "Puts a golfball sized hole in your enemies.");
        this.clone86x70("5fc382a9d724d907e2077dab", "ILLEGAL86x70");
        this.addToChambersMags("Caliber86x70", "ILLEGAL86x70");
        //9x19PARA
        this.addToHandbook("ILLEGAL9x19PARA", "5b47574386f77428ca22b33b", 8000);
        this.addToLocale("ILLEGAL9x19PARA", "9x19mm ILLEGAL", "ILLEGAL", "Pew pew.");
        this.clone9x19PARA("5efb0da7a29a85116f6ea05f", "ILLEGAL9x19PARA");
        this.addToChambersMags("Caliber9x19PARA", "ILLEGAL9x19PARA");
        this.addToRevolverShotty("624c3074dbbd335e8e6becf3", "ILLEGAL9x19PARA");
        //57x28
        this.addToHandbook("ILLEGAL57x28", "5b47574386f77428ca22b33b", 4000);
        this.addToLocale("ILLEGAL57x28", "5.7x28mm ILLEGAL", "ILLEGAL", "Might be difficult to get a gun that can use this early-mid game, but this absolutely slaps if you can get a gun for it.");
        this.clone57x28("5cc86832d7f00c000d3a6e6c", "ILLEGAL57x28");
        this.addToChambersMags("Caliber57x28", "ILLEGAL57x28");
        //9x21
        this.addToHandbook("ILLEGAL9x21", "5b47574386f77428ca22b33b", 5000);
        this.addToLocale("ILLEGAL9x21", "9x21mm ILLEGAL gzh", "ILLEGAL", "Has a fantastic selection of guns to be used with.");
        this.clone9x21("5a269f97c4a282000b151807", "ILLEGAL9x21");
        this.addToChambersMags("Caliber9x21", "ILLEGAL9x21");
        //9x33R
        this.addToHandbook("ILLEGAL9x33R", "5b47574386f77428ca22b33b", 5000);
        this.addToLocale("ILLEGAL9x33R", ".357 Magnum ILLEGAL", "ILLEGAL", "Real cowboys need real ammo!");
        this.clone9x33R("62330b3ed4dc74626d570b95", "ILLEGAL9x33R");
	    this.addToRevolverShotty("619f54a1d25cbd424731fb99", "ILLEGAL9x33R");	
        this.addToRevolverShotty("61a4cda622af7f4f6a3ce617", "ILLEGAL9x33R");
        //23x75
        this.addToHandbook("ILLEGAL23x75", "5b47574386f77428ca22b33b", 20000);
        this.addToLocale("ILLEGAL23x75", "23x75mm ILLEGAL buckshot", "ILLEGAL", "Now with even more body damage.");
        this.clone23x75("5e85aa1a988a8701445df1f5", "ILLEGAL23x75");
        this.addToChambersMags("Caliber23x75", "ILLEGAL23x75");
        //46x30
        this.addToHandbook("ILLEGAL46x30", "5b47574386f77428ca22b33b", 12500);
        this.addToLocale("ILLEGAL46x30", "46x30mm ILLEGAL SX", "ILLEGAL", "I SX'd your mom last night.");
        this.clone46x30("5ba26812d4351e003201fef1", "ILLEGAL46x30");
        this.addToChambersMags("Caliber46x30", "ILLEGAL46x30");
        //12g
        this.addToHandbook("ILLEGAL12g", "5b47574386f77428ca22b33b", 25000);
        this.addToLocale("ILLEGAL12g", "12/70 BOOM", "ILLEGAL", "Says BOOM. Don't kill yourself.");
        this.clone12g("560d5e524bdc2d25448b4571", "ILLEGAL12g");
        this.addToChambersMags("Caliber12g", "ILLEGAL12g");
        this.addToRevolverShotty("60dc519adf4c47305f6d410d", "ILLEGAL12g");	
        this.addAmmoToAllChambers("5580223e4bdc2d1c128b457f", "ILLEGAL12g");
        //20g
        this.addToHandbook("ILLEGAL20g", "5b47574386f77428ca22b33b", 15000);
        this.addToLocale("ILLEGAL20g", "20/70 BOOM", "ILLEGAL", "We all know the TOZ is the best weapon, but with this ammo it ascends to godmode.");
        this.clone20g("5a38ebd9c4a282000d722a5b", "ILLEGAL20g");
        this.addToChambersMags("Caliber20g", "ILLEGAL20g");

        if (debug) console.log("Handbook");
        if (debug) console.log(db.templates.handbook.Items.find(e => e.Id == "ILLEGAL762x25tt"));
        if (debug) console.log("Locale");
        if (debug) console.log(db.locales.global.en.templates["ILLEGAL762x25tt"]);
			//Define Ammo End
			
			//Define Custom Shrapnel Start
        this.cloneItem("5996f6cb86f774678763a6ca", "IllegalShrap");
        const IllegalShrap = db.templates.items["IllegalShrap"]._props;
        IllegalShrap.Damage = 50;
			//Define Custom Shrapnel End

			//Add Custom Ammo To Static Loot Start
        //Wooden ammo box
		this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL762x25tt", 484);
		this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL1143x23ACP", 434);
		this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL12g", 334);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL762x39", 394);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL762x51", 300);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL9x39", 420);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL545x39", 366);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL556x45NATO", 380);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL127x55", 333);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL762x35", 400);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL9x18PM", 473);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL366TKM", 366);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL40x46", 60);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL26x75", 15);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL762x54R", 316);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL86x70", 166);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL9x19PARA", 446);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL57x28", 473);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL9x21", 466);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL9x33R", 466);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL23x75", 366);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL20g", 400);
        this.addToStaticLoot("5909d45286f77465a8136dc6", "ILLEGAL46x30", 416);

        //Jacket
		this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL762x25tt", 484);
		this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL1143x23ACP", 434);
		this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL12g", 334);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL762x39", 394);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL762x51", 300);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL9x39", 420);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL545x39", 366);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL556x45NATO", 380);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL127x55", 333);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL762x35", 400);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL9x18PM", 473);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL366TKM", 366);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL40x46", 60);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL26x75", 15);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL762x54R", 316);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL86x70", 166);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL9x19PARA", 446);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL57x28", 473);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL9x21", 466);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL9x33R", 466);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL23x75", 366);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL20g", 400);
        this.addToStaticLoot("5914944186f774189e5e76c2", "ILLEGAL46x30", 416);
			//Add Custom Ammo To Static Loot Start
			
        //this.showWeaponMod()

    }
	
			//Add Custom Ammo To Loot Guns And Mags Start
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public postAkiLoad(container: DependencyContainer): void 
    {
        //   
    }
    private addToHandbook(id:string, parentID:string, price:number)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        db.templates.handbook.Items.push(
            {

                "Id": id,
                "ParentId": parentID,
                "Price": price

            }
        );
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
            };
    }
    addToRevolverShotty(itemId: string, ammoToAdd: string) 	
    {	
        const logger = container.resolve<ILogger>("WinstonLogger");	
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();	
        const weaponID = db.templates.items[itemId];	
        for (const index in weaponID._props.Slots)	
        {	
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan")	
            const z_Filter = weaponID._props.Slots[index]._props.filters[0].Filter;	
            z_Filter.push.apply(z_Filter, [ammoToAdd]);	
            const newFilters = [	
                {	
                    Filter: z_Filter,	
                    ExcludedFilter: []	
                }	
            ];	
            weaponID._props.Slots[index]._props.filters = newFilters;	
        }	
        for (const index in weaponID._props.Cartridges)	
        {	
            logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan")	
            const z_Filter = weaponID._props.Cartridges[index]._props.filters[0].Filter;	
            z_Filter.push.apply(z_Filter, [ammoToAdd]);	
            const newFilters = [	
                {	
                    Filter: z_Filter,	
                    ExcludedFilter: []	
                }	
            ];	
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
        ];
        for (const lootItem of newLoot)
        {
            lootDistr.push.apply(lootDistr, [lootItem]);
        }
        lootContainter.itemDistribution = lootDistr;
        //if (debug) logger.log([lootContainter], "green");
    }
			//Add Custom Ammo To Loot Guns And Mags End
			
			//Define Ammo Stats Start
    private cloneNewAmmo(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 1000;
        ammoID._props.BallisticCoeficient = 1;
        ammoID._props.Damage = 150;
        ammoID._props.ammoAccr = 0;
        ammoID._props.ammoRec = -10;
        ammoID._props.ammoDist = 0;
        ammoID._props.PenetrationPower = 60;
        ammoID._props.MisfireChance = 0.05;
        ammoID._props.PenetrationChance = 1;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 0.5;
        ammoID._props.HeatFactor = 0.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
    private cloneBoomAmmo(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 500;
        ammoID._props.BallisticCoeficient = 1;
        ammoID._props.Damage = 200;
        ammoID._props.ammoAccr = 0;
        ammoID._props.ammoRec = -100;
        ammoID._props.ammoDist = 0;
        ammoID._props.PenetrationPower = 60;
        ammoID._props.MisfireChance = 0.05;
        ammoID._props.PenetrationChance = 1;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 0.5;
        ammoID._props.HeatFactor = 0.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.buckshotBullets = this.modConfig.BuckshotBulletsCount;
	    ammoID._props.ProjectileCount = this.modConfig.BuckshotBulletsCount;
        ammoID._props.HasGrenaderComponent = true;
        ammoID._props.ShowHitEffectOnExplode = true;
        ammoID._props.FragmentsCount = this.modConfig.FragmentCount;
        ammoID._props.FragmentType = "IllegalShrap";
        ammoID._props.ExplosionType = "big_round_impact_explosive";
        ammoID._props.MinExplosionDistance = 0.15;
        ammoID._props.MaxExplosionDistance = 5;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("BoomAmmo " + ammoID._id + " Added", LogTextColor.green);
    }
	//762x25TT
	private clone762x25TT(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 430;
        ammoID._props.Damage = 66;
        ammoID._props.ammoAccr = 15;
        ammoID._props.ammoRec = -15;
        ammoID._props.PenetrationPower = 25;
	    ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//45ACP
	private clone45ACP(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 340;
        ammoID._props.Damage = 137;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = 0;
        ammoID._props.PenetrationPower = 38;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//762x39
	private clone762x39(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 754;
        ammoID._props.Damage = 87;
        ammoID._props.ammoAccr = 5;
        ammoID._props.ammoRec = -30;
        ammoID._props.PenetrationPower = 58;
        ammoID._props.MisfireChance = 0.30;
        ammoID._props.MalfMisfireChance = 0.1;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.1;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//762x51
	private clone762x51(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 910;
        ammoID._props.Damage = 107;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -5;
        ammoID._props.PenetrationPower = 70;
	    ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//9x39
	private clone9x39(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 320;
        ammoID._props.Damage = 71;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -5;
        ammoID._props.PenetrationPower = 55;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//545x39
	private clone545x39(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 915;
        ammoID._props.Damage = 74;
        ammoID._props.ammoAccr = 50;
        ammoID._props.ammoRec = -25;
        ammoID._props.PenetrationPower = 62;
        ammoID._props.MisfireChance = 0.30;
        ammoID._props.MalfMisfireChance = 0.1;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.01;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//556x45NATO
	private clone556x45NATO(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 1013;
        ammoID._props.Damage = 88;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -5;
        ammoID._props.PenetrationPower = 57;
        ammoID._props.MisfireChance = 0.30;
        ammoID._props.MalfMisfireChance = 0.1;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.1;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//127x55
	private clone127x55(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 300;
        ammoID._props.Damage = 165;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -12;
        ammoID._props.PenetrationPower = 46;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//762x35
	private clone762x35(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 853;
        ammoID._props.Damage = 90;
        ammoID._props.ammoAccr = 30;
        ammoID._props.ammoRec = -10;
        ammoID._props.PenetrationPower = 48;
        ammoID._props.MisfireChance = 0.30;
        ammoID._props.MalfMisfireChance = 0.1;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.1;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//9x18PM
	private clone9x18PM(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 519;
        ammoID._props.Damage = 77;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -7;
        ammoID._props.PenetrationPower = 28;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.5;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//366TKM
	private clone366TKM(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 770;
        ammoID._props.Damage = 110;
        ammoID._props.ammoAccr = 0;
        ammoID._props.ammoRec = -15;
        ammoID._props.PenetrationPower = 42;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//40x46
	private clone40x46(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 250;
        ammoID._props.Damage = 400;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -50;
        ammoID._props.PenetrationPower = 60;
        ammoID._props.MisfireChance = 0.45;
		ammoID._props.PenetrationChance = 1;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//26x75
	private clone26x75(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 100;
        ammoID._props.Damage = 1000;
        ammoID._props.PenetrationPower = 10;
        ammoID._props.MisfireChance = 0.45;
		ammoID._props.PenetrationChance = 0.5;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//762x54R
	private clone762x54R(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 875;
        ammoID._props.Damage = 84;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -5;
        ammoID._props.PenetrationPower = 70;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//86x70
	private clone86x70(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 900;
        ammoID._props.Damage = 196;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = 0;
        ammoID._props.PenetrationPower = 79;
        ammoID._props.MisfireChance = 0.60;
        ammoID._props.MalfMisfireChance = 0.20;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.20;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//9x19PARA
	private clone9x19PARA(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 560;
        ammoID._props.Damage = 102;
        ammoID._props.ammoAccr = 15;
        ammoID._props.ammoRec = -6;
        ammoID._props.PenetrationPower = 39;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//57x28
	private clone57x28(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 922;
        ammoID._props.Damage = 98;
        ammoID._props.ammoAccr = 5;
        ammoID._props.ammoRec = -24;
        ammoID._props.PenetrationPower = 37;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//9x21
	private clone9x21(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 415;
        ammoID._props.Damage = 80;
        ammoID._props.ammoAccr = 0;
        ammoID._props.ammoRec = -4;
        ammoID._props.PenetrationPower = 39;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//9x33R
	private clone9x33R(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 481;
        ammoID._props.Damage = 108;
        ammoID._props.ammoAccr = 27;
        ammoID._props.ammoRec = -29;
        ammoID._props.PenetrationPower = 35;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//23x75
	private clone23x75(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 420;
        ammoID._props.Damage = 348;
        ammoID._props.ammoAccr = 20;
        ammoID._props.ammoRec = 0;
        ammoID._props.PenetrationPower = 39;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//46x30
	private clone46x30(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 690;
        ammoID._props.Damage = 65;
        ammoID._props.ammoAccr = 10;
        ammoID._props.ammoRec = -22;
        ammoID._props.PenetrationPower = 53;
        ammoID._props.MisfireChance = 0.15;
        ammoID._props.MalfMisfireChance = 0.05;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.05;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        logger.logWithColor("Ammo " + ammoID._id + " Added", LogTextColor.green);
        
    }
	//12g
    private clone12g(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 430;
        ammoID._props.Damage = 50;
        ammoID._props.ammoAccr = 15;
        ammoID._props.ammoRec = 0;
        ammoID._props.PenetrationPower = 31;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.buckshotBullets = this.modConfig.SmallBuckshotBulletsCount;
	    ammoID._props.ProjectileCount = this.modConfig.SmallBuckshotBulletsCount;
        ammoID._props.HasGrenaderComponent = true;
        ammoID._props.ShowHitEffectOnExplode = true;
        ammoID._props.FragmentsCount = this.modConfig.FragmentCount;
        ammoID._props.FragmentType = "IllegalShrap";
        ammoID._props.ExplosionType = "big_round_impact_explosive";
        ammoID._props.MinExplosionDistance = 0.15;
        ammoID._props.MaxExplosionDistance = 5;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("BoomAmmo " + ammoID._id + " Added", LogTextColor.green);
    }
	//20g
	private clone20g(ammoToClone:string, newAmmoID:string)
    {
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        this.cloneItem(ammoToClone, newAmmoID);
        const ammoID = db.templates.items[newAmmoID];
        ammoID._props.InitialSpeed = 475;
        ammoID._props.Damage = 26;
        ammoID._props.ammoAccr = 0;
        ammoID._props.ammoRec = 0;
        ammoID._props.PenetrationPower = 3;
        ammoID._props.MisfireChance = 0.45;
        ammoID._props.MalfMisfireChance = 0.15;
        ammoID._props.DurabilityBurnModificator = 2;
        ammoID._props.HeatFactor = 1.5;
        ammoID._props.MalfFeedChance = 0.15;
        ammoID._props.buckshotBullets = this.modConfig.BigBuckshotBulletsCount;
	    ammoID._props.ProjectileCount = this.modConfig.BigBuckshotBulletsCount;
        ammoID._props.HasGrenaderComponent = true;
        ammoID._props.ShowHitEffectOnExplode = true;
        ammoID._props.FragmentsCount = this.modConfig.FragmentCount;
        ammoID._props.FragmentType = "IllegalShrap";
        ammoID._props.ExplosionType = "big_round_impact_explosive";
        ammoID._props.MinExplosionDistance = 0.15;
        ammoID._props.MaxExplosionDistance = 3;
        ammoID._props.BackgroundColor = "tracerRed"
        ammoID._props.Finallowed = false;
        ammoID._props.FinAllowed = false;
        logger.logWithColor("BoomAmmo " + ammoID._id + " Added", LogTextColor.green);
    }
			//Define Ammo Stats End
			
			//Define Trader Settings Start
    private cloneItem(itemtoClone:string, newitemID:string)
    {
        
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        const logger = container.resolve<ILogger>("WinstonLogger");
        const itemToAdd = newitemID;
        db.templates.items[itemToAdd] = JsonUtil.clone(db.templates.items[itemtoClone])
        db.templates.items[itemToAdd]._id = itemToAdd;
        
        if (debug) logger.logWithColor(db.templates.items[itemtoClone]._name + " cloned", LogTextColor.green);
    }
    private registerProfileImage(container: DependencyContainer): void 
    {
        const preAkiModLoader = container.resolve<PreAkiModLoader>("PreAkiModLoader");
        const imageFilepath = `./${preAkiModLoader.getModPath(this.mod)}res`;

        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        imageRouter.addRoute(DarkWebAmmoTrader.avatar.replace(".jpg", ""), `${imageFilepath}/DarkWebAMMO.jpg`);
    }
    private setupTraderUpdateTime(container: DependencyContainer): void 
    {
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const traderRefreshConfig: UpdateTime = {traderId: DarkWebAmmoTrader._id, seconds: 10800}
        traderConfig.updateTime.push(traderRefreshConfig);
    }
    private addToChambersMags(caliber:string, ammoToAdd:string)
    {
        this.addAmmoToAllMags(caliber, ammoToAdd);
        this.addAmmoToAllChambers(caliber, ammoToAdd);
    }
    private createAssortTable(): ITraderAssort
    {
        const assortTable: ITraderAssort = {
            items: [],
            barter_scheme: {},
            loyal_level_items: {}
        }

        const ROUBLE_ID = "5449016a4bdc2d6f028b456f";

        //762x25TT
        const newILLEGAL762x25tt: Item = {
            _id: "ILLEGAL762x25tt",
            _tpl: "ILLEGAL762x25tt",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL762x25tt);

        assortTable.barter_scheme["ILLEGAL762x25tt"] = [
            [
                {
                    count: this.modConfig.ILLEGAL762x25ttPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL762x25tt"] = 1;
        //1143x23ACP
        const newILLEGAL1143x23ACP: Item = {
            _id: "ILLEGAL1143x23ACP",
            _tpl: "ILLEGAL1143x23ACP",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL1143x23ACP);

        assortTable.barter_scheme["ILLEGAL1143x23ACP"] = [
            [
                {
                    count: this.modConfig.ILLEGAL1143x23ACPPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
		assortTable.loyal_level_items["ILLEGAL1143x23ACP"] = 2;
        //12g
        const newILLEGAL12g: Item = {
            _id: "ILLEGAL12g",
            _tpl: "ILLEGAL12g",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 5,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL12g);

        assortTable.barter_scheme["ILLEGAL12g"] = [
            [
                {
                    count: this.modConfig.ILLEGAL12gPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
		assortTable.loyal_level_items["ILLEGAL12g"] = 4;
        //ILLEGAL762x39
        const newILLEGAL762x39: Item = {
            _id: "ILLEGAL762x39",
            _tpl: "ILLEGAL762x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
				UnlimitedCount: true,
                StackObjectsCount: 999999999,
                BuyRestrictionMax: 30,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL762x39);

        assortTable.barter_scheme["ILLEGAL762x39"] = [
            [
                {
                    count: this.modConfig.ILLEGAL762x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL762x39"] = 3;
        //ILLEGAL762x51
        const newILLEGAL762x51: Item = {
            _id: "ILLEGAL762x51",
            _tpl: "ILLEGAL762x51",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
			    UnlimitedCount: true,
                StackObjectsCount: 999999999,
                BuyRestrictionMax: 10,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL762x51);

        assortTable.barter_scheme["ILLEGAL762x51"] = [
            [
                {
                    count: this.modConfig.ILLEGAL762x51Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL762x51"] = 4;
        //ILLEGAL9x39
        const newILLEGAL9x39: Item = {
            _id: "ILLEGAL9x39",
            _tpl: "ILLEGAL9x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL9x39);

        assortTable.barter_scheme["ILLEGAL9x39"] = [
            [
                {
                    count: this.modConfig.ILLEGAL9x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL9x39"] = 2;
        //ILLEGAL545x39
        const newILLEGAL545x39: Item = {
            _id: "ILLEGAL545x39",
            _tpl: "ILLEGAL545x39",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 30,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL545x39);

        assortTable.barter_scheme["ILLEGAL545x39"] = [
            [
                {
                    count: this.modConfig.ILLEGAL545x39Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL545x39"] = 3;
        //ILLEGAL556x45NATO
        const newILLEGAL556x45NATO: Item = {
            _id: "ILLEGAL556x45NATO",
            _tpl: "ILLEGAL556x45NATO",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 30,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL556x45NATO);

        assortTable.barter_scheme["ILLEGAL556x45NATO"] = [
            [
                {
                    count: this.modConfig.ILLEGAL556x45NATOPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL556x45NATO"] = 3;
        //ILLEGAL127x55
        const newILLEGAL127x55: Item = {
            _id: "ILLEGAL127x55",
            _tpl: "ILLEGAL127x55",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 7,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL127x55);

        assortTable.barter_scheme["ILLEGAL127x55"] = [
            [
                {
                    count: this.modConfig.ILLEGAL127x55Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL127x55"] = 4;
        //ILLEGAL762x35
        const newILLEGAL762x35: Item = {
            _id: "ILLEGAL762x35",
            _tpl: "ILLEGAL762x35",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 30,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL762x35);

        assortTable.barter_scheme["ILLEGAL762x35"] = [
            [
                {
                    count: this.modConfig.ILLEGAL762x35Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL762x35"] = 2;
        //ILLEGAL9x18PM
        const newILLEGAL9x18PM: Item = {
            _id: "ILLEGAL9x18PM",
            _tpl: "ILLEGAL9x18PM",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL9x18PM);

        assortTable.barter_scheme["ILLEGAL9x18PM"] = [
            [
                {
                    count: this.modConfig.ILLEGAL9x18PMPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL9x18PM"] = 1;
        //ILLEGAL366TKM
        const newILLEGAL366TKM: Item = {
            _id: "ILLEGAL366TKM",
            _tpl: "ILLEGAL366TKM",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 15,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL366TKM);

        assortTable.barter_scheme["ILLEGAL366TKM"] = [
            [
                {
                    count: this.modConfig.ILLEGAL366TKMPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL366TKM"] = 3;
        //ILLEGAL40x46
        const newILLEGAL40x46: Item = {
            _id: "ILLEGAL40x46",
            _tpl: "ILLEGAL40x46",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 3,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL40x46);

        assortTable.barter_scheme["ILLEGAL40x46"] = [
            [
                {
                    count: this.modConfig.ILLEGAL40x46Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL40x46"] = 4;
        //ILLEGAL26x75
        const newILLEGAL26x75: Item = {
            _id: "ILLEGAL26x75",
            _tpl: "ILLEGAL26x75",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 1,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL26x75);

        assortTable.barter_scheme["ILLEGAL26x75"] = [
            [
                {
                    count: this.modConfig.ILLEGAL26x75Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL26x75"] = 4;
        //ILLEGAL762x54R
        const newILLEGAL762x54R: Item = {
            _id: "ILLEGAL762x54R",
            _tpl: "ILLEGAL762x54R",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 10,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL762x54R);

        assortTable.barter_scheme["ILLEGAL762x54R"] = [
            [
                {
                    count: this.modConfig.ILLEGAL762x54RPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL762x54R"] = 4;
        //ILLEGAL86x70
        const newILLEGAL86x70: Item = {
            _id: "ILLEGAL86x70",
            _tpl: "ILLEGAL86x70",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 3,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL86x70);

        assortTable.barter_scheme["ILLEGAL86x70"] = [
            [
                {
                    count: this.modConfig.ILLEGAL86x70Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL86x70"] = 4;
        //ILLEGAL9x19PARA
        const newILLEGAL9x19PARA: Item = {
            _id: "ILLEGAL9x19PARA",
            _tpl: "ILLEGAL9x19PARA",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL9x19PARA);

        assortTable.barter_scheme["ILLEGAL9x19PARA"] = [
            [
                {
                    count: this.modConfig.ILLEGAL9x19PARAPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL9x19PARA"] = 2;
        //ILLEGAL57x28
        const newILLEGAL57x28: Item = {
            _id: "ILLEGAL57x28",
            _tpl: "ILLEGAL57x28",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL57x28);

        assortTable.barter_scheme["ILLEGAL57x28"] = [
            [
                {
                    count: this.modConfig.ILLEGAL57x28Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL57x28"] = 1;
        //ILLEGAL9x21
        const newILLEGAL9x21: Item = {
            _id: "ILLEGAL9x21",
            _tpl: "ILLEGAL9x21",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL9x21);

        assortTable.barter_scheme["ILLEGAL9x21"] = [
            [
                {
                    count: this.modConfig.ILLEGAL9x21Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL9x21"] = 1;
        //ILLEGAL9x33R
        const newILLEGAL9x33R: Item = {
            _id: "ILLEGAL9x33R",
            _tpl: "ILLEGAL9x33R",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 25,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL9x33R);

        assortTable.barter_scheme["ILLEGAL9x33R"] = [
            [
                {
                    count: this.modConfig.ILLEGAL9x33RPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL9x33R"] = 2;
        //ILLEGAL23x75
        const newsILLEGAL23x75: Item = {
            _id: "ILLEGAL23x75",
            _tpl: "ILLEGAL23x75",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 10,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newsILLEGAL23x75);

        assortTable.barter_scheme["ILLEGAL23x75"] = [
            [
                {
                    count: this.modConfig.ILLEGAL23x75Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL23x75"] = 3;
        //ILLEGAL20g
        const newILLEGAL20g: Item = {
            _id: "ILLEGAL20g",
            _tpl: "ILLEGAL20g",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 5,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL20g);

        assortTable.barter_scheme["ILLEGAL20g"] = [
            [
                {
                    count: this.modConfig.ILLEGAL20gPrice,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL20g"] = 2;
        //ILLEGAL46x30
        const newILLEGAL46x30: Item = {
            _id: "ILLEGAL46x30",
            _tpl: "ILLEGAL46x30",
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999999,
				BuyRestrictionMax: 50,
				BuyRestrictionCurrent: 0
            }
        };

        assortTable.items.push(newILLEGAL46x30);

        assortTable.barter_scheme["ILLEGAL46x30"] = [
            [
                {
                    count: this.modConfig.ILLEGAL46x30Price,
                    _tpl: ROUBLE_ID
                }
            ]
        ];
        assortTable.loyal_level_items["ILLEGAL46x30"] = 2;

        return assortTable;
    }
			//Define Trader Settings End
}

module.exports = { mod: new ILLEGALAmmo() }