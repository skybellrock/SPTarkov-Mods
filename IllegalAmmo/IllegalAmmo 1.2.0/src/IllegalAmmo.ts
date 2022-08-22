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

    private debug = this.castBool(this.modConfig["General Config"]["Debug Log"]);
    private log = this.castBool(this.modConfig["General Config"]["Detailed Server Log"]);
    private logger = container.resolve<ILogger>("WinstonLogger");	
    private db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
    
    public preAkiLoad(container: DependencyContainer): void 
    {
        this.registerProfileImage(container);

        this.setupTraderUpdateTime(container);
        
        this.logger.logWithColor("Loading: Illegal AMMO", LogTextColor.BLUE);
    }
	
    public postDBLoad(container: DependencyContainer): void 
    {
        this.db = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        
        const CaliberGroup: string[] = [/*0*/ "Small Calibre",/*1*/ "Medium Calibre",/*2*/ "Large Calibre",/*3*/ "Special Calibre"];
        const LoyaltyGroup: string[] = ["1", "2", "3", "4"]
        const HandbookID = "5b47574386f77428ca22b33b";
        const ContainerBlacklistID = "5448bf274bdc2dfc2f8b456a";
        const AdvAmmoConfigGroup = this.modConfig["Advanced Ammunition Config"];
		
        var CreateAssortTable = this.createAssortTable();
        var Name: string[] = [];
        var AmmoID: string[] = [];
        var CloneID: string[] = [];
        var CaliberID: string[] = [];
		var CaliberThisIs:  number[] = [];
        var LoyaltyGroupThisIs:  number[] = [];
        var Descript: string[] = [];

        var ValidID="";

        var _V_ID_Index: string[] = [];
        var _V_ToAddList: string[] = [];
        var _V_ToValueList: any[] = [];

        var _V_AmmoProbabilityEachContainer: number[][] = [];

			//Define Ammo Start

        this.showCaliber();
		
            enum  CaliberClass {
                Small = 0,
                Medium = 1,
                Large = 2,
                Special = 3
            }

            enum  LoyaltyLevel {
                One = 0,
                Two = 1,
                Three = 2,
                Four = 3
            }

            function appendBullet(_Name: string, _AmmoID: string, _CloneID: string, _CaliberID: string, _CaliberThisIs: number, _LoyaltyGroupThisIs: number, _Description: string)
            {
                Name.push(_Name)
                AmmoID.push(_AmmoID);
                CloneID.push(_CloneID);
                CaliberID.push(_CaliberID);
                CaliberThisIs.push(_CaliberThisIs);
                LoyaltyGroupThisIs.push(_LoyaltyGroupThisIs)
                Descript.push(_Description);
                ValidID=_AmmoID;
            }

            function appendCylinder(_Cylinder: string)
            {
                _V_ID_Index.push(ValidID);
                _V_ToAddList.push("CYLINDER");
                _V_ToValueList.push(_Cylinder);
            }

            function appendAmmoToAllChamber(_AmmoChamber: string)
            {
                _V_ID_Index.push(ValidID);
                _V_ToAddList.push("AMMO_CHAMBER");
                _V_ToValueList.push(_AmmoChamber);   
            }


            //Add Bullet Data Start (Name, ID)
            appendBullet("7.62x25mm TT ILLEGAL", "7.62x25mm TT ILLEGAL", "5735fdcd2459776445391d61", "Caliber762x25TT", CaliberClass.Small, LoyaltyLevel.One,"A powerful spray and pray bullet.");
            appendBullet(".45 ACP ILLEGAL", ".45 ACP ILLEGAL", "5ea2a8e200685063ec28c05a", "Caliber1143x23ACP", CaliberClass.Small, LoyaltyLevel.Two, "Leg meta? More like body meta.");
            appendBullet("9x39mm ILLEGAL gs", "9x39mm ILLEGAL gs", "5c0d688c86f77413ae3407b2", "Caliber9x39", CaliberClass.Small, LoyaltyLevel.Two, "The enemy won't hear it coming, literally.");
            appendBullet("9x18mm PM ILLEGAL gzh", "9x18mm PM ILLEGAL gzh", "573718ba2459775a75491131", "Caliber9x18PM", CaliberClass.Small, LoyaltyLevel.One, "Leg meta unlocked.");
            appendBullet("9x19mm ILLEGAL", "9x19mm ILLEGAL", "5efb0da7a29a85116f6ea05f", "Caliber9x19PARA", CaliberClass.Small, LoyaltyLevel.Two, "Pew pew."); appendCylinder("624c3074dbbd335e8e6becf3");
            appendBullet("5.7x28mm ILLEGAL", "5.7x28mm ILLEGAL", "5cc86832d7f00c000d3a6e6c", "Caliber57x28", CaliberClass.Small, LoyaltyLevel.One, "Might be difficult to get a gun that can use this early-mid game, but this absolutely slaps if you can get a gun for it.");
            appendBullet("9x21mm ILLEGAL gzh", "9x21mm ILLEGAL gzh", "5a269f97c4a282000b151807", "Caliber9x21", CaliberClass.Small, LoyaltyLevel.One, "Has a fantastic selection of guns to be used with.");
            appendBullet("4.6x30mm ILLEGAL SX", "4.6x30mm ILLEGAL SX", "5ba26812d4351e003201fef1", "Caliber46x30", CaliberClass.Small, LoyaltyLevel.Two, "Has an inscription on the side of it: \"I SX'd your mom last night.\"");
            appendBullet("7.62x39mm ILLEGAL", "7.62x39mm ILLEGAL", "59e0d99486f7744a32234762", "Caliber762x39", CaliberClass.Medium, LoyaltyLevel.Three, "Even more meta.");
            appendBullet("5.45x39mm ILLEGAL gs", "5.45x39mm ILLEGAL gs", "5c0d5e4486f77478390952fe", "Caliber545x39", CaliberClass.Medium, LoyaltyLevel.Three, "A classic made classier.");
            appendBullet("5.56x45mm ILLEGAL", "5.56x45mm ILLEGAL", "59e6920f86f77411d82aa167", "Caliber556x45NATO", CaliberClass.Medium, LoyaltyLevel.Three, "Of course 5.45 needs competition.");
            appendBullet(".300 Blackout ILLEGAL", ".300 Blackout ILLEGAL", "5fbe3ffdf8b6a877a729ea82", "Caliber762x35", CaliberClass.Medium, LoyaltyLevel.Two, "Very underrated caliber, this ammo is fantastic!");
            appendBullet(".366 TKM ILLEGAL", ".366 TKM ILLEGAL", "59e655cb86f77411dc52a77b", "Caliber366TKM", CaliberClass.Medium, LoyaltyLevel.Three, "You will use this fantastic ammo with a shitty old gun, aren't you?");
            appendBullet(".357 Magnum ILLEGAL", ".357 Magnum ILLEGAL", "62330b3ed4dc74626d570b95", "", CaliberClass.Medium, LoyaltyLevel.Two, "Real cowboys need real ammo!"); appendCylinder("619f54a1d25cbd424731fb99"); appendCylinder("61a4cda622af7f4f6a3ce617");
            appendBullet("7.62x51mm ILLEGAL", "7.62x51mm ILLEGAL", "5a6086ea4f39f99cd479502f", "Caliber762x51", CaliberClass.Large, LoyaltyLevel.Four, "This bullet can tear a hole through your house.");
            appendBullet("12.7x55mm PS12I", "12.7x55mm PS12I", "5cadf6e5ae921500113bb973", "Caliber127x55", CaliberClass.Large, LoyaltyLevel.Four, "...And they say size doesn't matter.");
            appendBullet("12.7x55mm PS12IB", "12.7x55mm PS12IB", "5cadf6eeae921500134b2799", "Caliber127x55", CaliberClass.Large, LoyaltyLevel.Four, "...Size matters when trying to create da boom");
            appendBullet("7.62x54mm R ILLEGAL gzh", "7.62x54mm R ILLEGAL gzh", "5e023d34e8a400319a28ed44", "Caliber762x54R", CaliberClass.Large, LoyaltyLevel.Four, "Passes the bar for Shooter Born In heaven. In fact this bullet could probably kill immortals.");
            appendBullet("23x75mm \"ILLEGAL\" buckshot", "23x75mm ILLEGAL buckshot", "5e85a9a6eacf8c039e4e2ac1", "Caliber23x75", CaliberClass.Large, LoyaltyLevel.Two, "A great example of why armor is literally not worth it.");
            appendBullet("23x75mm \"ILLEGAL\" slug", "23x75mm ILLEGAL slug", "5e85aa1a988a8701445df1f5", "Caliber23x75", CaliberClass.Large, LoyaltyLevel.One, "Now with even more body damage.");
            appendBullet("23x75mm \"ILLEGAL\" flashbang", "23x75mm ILLEGAL flashbang", "5e85a9f4add9fe03027d9bf1", "Caliber23x75", CaliberClass.Large, LoyaltyLevel.Four, "This shell is not only over-powered, but it also makes you feel like a god, and can be used to bully your enemies. Both blinds and can deal damage, if only a little. Headshots are key.");
            appendBullet("26x75mm signal flare of death (green)", "26x75mm signal flare of death (green)", "62389aaba63f32501b1b444f", "Caliber26x75", CaliberClass.Special, LoyaltyLevel.Two, "Two words: Death, Flare. What could be cooler?");
            //appendBullet("26x75mm signal flare of flex (red)", "26x75mm signal flare of flex (red)", "62389ba9a63f32501b1b4451", "Caliber26x75", CaliberClass.Special, LoyaltyLevel.Four, "Let's you dance on your enemy's graves by calling in an airdrop on their dead bodies.");
            appendBullet("12/70mm ILLEGAL buckshot", "12/70mm ILLEGAL buckshot", "5c0d591486f7744c505b416f", "Caliber12g", CaliberClass.Special, LoyaltyLevel.Two, "Hopefully these pellets are better than the ones you give your pet to eat. Pets have tastebuds too you know."); appendCylinder("60dc519adf4c47305f6d410d"); appendAmmoToAllChamber("5580223e4bdc2d1c128b457f");
            appendBullet("12/70mm ILLEGAL slug", "12/70mm ILLEGAL slug", "5d6e68e6a4b9361c140bcfe0", "Caliber12g", CaliberClass.Special, LoyaltyLevel.Three, "Turns your shotgun into a sniper rifle, so you can finally shoot those pesky birds the way you are meant to."); appendCylinder("60dc519adf4c47305f6d410d"); appendAmmoToAllChamber("5580223e4bdc2d1c128b457f");
            appendBullet("12/70mm ILLEGAL BOOM", "12/70mm ILLEGAL BOOM", "5d6e68a8a4b9360b6c0d54e2", "Caliber12g", CaliberClass.Special, LoyaltyLevel.Four, "Says BOOM. Don't kill yourself."); appendCylinder("60dc519adf4c47305f6d410d"); appendAmmoToAllChamber("5580223e4bdc2d1c128b457f");
            appendBullet("20/70mm ILLEGAL buckshot", "20/70mm ILLEGAL buckshot", "5a38ebd9c4a282000d722a5b", "Caliber20g", CaliberClass.Special, LoyaltyLevel.One, "We all know the TOZ is the best weapon, but with this ammo it becomes META.");
            appendBullet("20/70mm ILLEGAL slug", "20/70mm ILLEGAL slug", "5d6e6a05a4b93618084f58d0", "Caliber20g", CaliberClass.Special, LoyaltyLevel.Two, "Huge slugs does just as much damage to people as it does your garden.");
            appendBullet("20/70mm ILLEGAL BOOM", "20/70mm ILLEGAL BOOM", "5d6e6a53a4b9361bd473feec", "Caliber20g", CaliberClass.Special, LoyaltyLevel.Three, "It say's'a da BOOM.");
            appendBullet(".338 Lapua Magnum ILLEGAL", ".338 Lapua Magnum ILLEGAL", "5fc382a9d724d907e2077dab", "Caliber86x70", CaliberClass.Special, LoyaltyLevel.Four, "Puts a golfball sized hole in your enemies.");
            appendBullet(".338 Lapua Magnum ILLEGAL BOOM", ".338 Lapua Magnum ILLEGAL BOOM", "5fc382b6d6fa9c00c571bbc3", "Caliber86x70", CaliberClass.Special, LoyaltyLevel.Four, "So someone figured this ammo was big enough to put gunpowder into...");
            appendBullet("40x46mm ILLEGAL (HE) grenade", "40x46mm ILLEGAL (HE) grenade", "5ede474b0c226a66f5402622", "Caliber40x46", CaliberClass.Special, LoyaltyLevel.Four, "Turns enemies into mush."); appendCylinder("627bce33f21bc425b06ab967");
            //Add Bullet Data End


            this.logger.logWithColor("Loading Through: "+String(AmmoID.length)+" Bullets", LogTextColor.GREEN);
            let TotalPriceValue = 0;
            for (let i = 0; i < AmmoID.length; i++) {
                let V = CaliberThisIs[i];
                const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][CaliberGroup[V]][AmmoID[i]]
                let _FoundVal = AdvAmmoConfig["Buy Price"];
                if (typeof _FoundVal === 'number' )
                {
                    TotalPriceValue += _FoundVal;
                }

            }

            let _RetValContainers=this.GetProbabiliySum();
            for (let i = 0; i < AmmoID.length; i++) {
                let V = CaliberThisIs[i];
                let _RetVal=this.calculateLootChances(AmmoID[i], CaliberGroup[V], TotalPriceValue,_RetValContainers);
                _V_AmmoProbabilityEachContainer[i]=_RetVal;
                
            }

            for (let i = 0; i < AmmoID.length; i++) {
                let V = CaliberThisIs[i];
                let Z = LoyaltyGroupThisIs[i];
                let Tag = "ILLEGAL";
                //this.logger.logWithColor("Adding->> |"+String(AmmoID[i])+"| Group: |"+String(CaliberGroup[V])+"|   |"+String(CloneID[i])+"|<--", LogTextColor.GREEN);
                this.addToLocale(AmmoID[i], Name[i], Tag, Descript[i]);
                this.addToHandbook(HandbookID, AmmoID[i], CaliberGroup[V]);
                this.cloneAmmo(CloneID[i], AmmoID[i], CaliberGroup[V]);
                this.addToPrices(AmmoID[i], CaliberGroup[V]);
                this.addToContainerBlacklist(ContainerBlacklistID, AmmoID[i], CaliberGroup[V]);
                this.addToAssortTable(CreateAssortTable, AmmoID[i], CaliberGroup[V], LoyaltyGroup[Z]);
                this.createLootTables(AmmoID[i],_V_AmmoProbabilityEachContainer[i]);

                if (CaliberID[i]!="")
                {
                this.addToChambersMags(CaliberID[i], AmmoID[i]);
                }
                if (this.log) this.logger.logWithColor("Loading: "+String(i+1)+"/"+String(AmmoID.length)+" Bullets", LogTextColor.GREEN);
            }

                if (this.log) this.logger.logWithColor("Applying Additions: "+String(_V_ID_Index.length)+" Additions", LogTextColor.GREEN);
                for (let i = 0; i < _V_ID_Index.length; i++) {
                let Index =_V_ID_Index[i];
                let Type =_V_ToAddList[i];
                let Value =_V_ToValueList[i];

                if (Type == "AMMO_CHAMBER")
                {
                this.addToChambersMags(Value, Index);
                }
                else
                    if (Type == "CYLINDER")
                    {
                        this.addToCylinder(Value, Index);
                    }
                if (this.log) this.logger.logWithColor("Loading: "+String(i+1)+"/"+String(_V_ID_Index.length)+" Additions", LogTextColor.GREEN);
            }            
                //Define Ammo End

        
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const GenConfig = this.modConfig["General Config"];


			//Define Custom Shrapnel Start
            //CHECK SIMPLIFY
        this.cloneItem("5996f6cb86f774678763a6ca", "Weakest Illegal Shrapnel");
        const WeakestIllegalShrapnel = this.db.templates.items["Weakest Illegal Shrapnel"]._props;
        WeakestIllegalShrapnel.Damage = this.numberCast(GenConfig["Weakest Shrapnel Damage"], 0);

        this.cloneItem("5996f6cb86f774678763a6ca", "Weak Illegal Shrapnel");
        const WeakIllegalShrapnel = this.db.templates.items["Weak Illegal Shrapnel"]._props;
        WeakIllegalShrapnel.Damage = this.numberCast(GenConfig["Weak Shrapnel Damage"], 0);

        this.cloneItem("5996f6cb86f774678763a6ca", "Medium Illegal Shrapnel");
        const MediumIllegalShrapnel = this.db.templates.items["Medium Illegal Shrapnel"]._props;
        MediumIllegalShrapnel.Damage = this.numberCast(GenConfig["Medium Shrapnel Damage"], 0);

        this.cloneItem("5996f6cb86f774678763a6ca", "Strong Illegal Shrapnel");
        const StrongIllegalShrapnel = this.db.templates.items["Strong Illegal Shrapnel"]._props;
        StrongIllegalShrapnel.Damage = this.numberCast(GenConfig["Strong Shrapnel Damage"], 0);

        this.cloneItem("5996f6cb86f774678763a6ca", "Strongest Illegal Shrapnel");
        const StrongestIllegalShrapnel = this.db.templates.items["Strongest Illegal Shrapnel"]._props;
        StrongestIllegalShrapnel.Damage = this.numberCast(GenConfig["Strongest Shrapnel Damage"], 0);
            //Define Custom Shrapnel End

        if (this.debug) console.log("Handbook");
        if (this.debug) console.log(this.db.templates.handbook.Items.find(e => e.Id == "7.62x25mm TT ILLEGAL"));
        if (this.debug) console.log("Locale");
        if (this.debug) console.log(this.db.locales.global.en.templates["7.62x25mm TT ILLEGAL"]);
			//Define Ammo End
			

            this.db.traders[DarkWebAmmoTrader._id] =
        {
            assort: CreateAssortTable,
            base: JsonUtil.deserialize(JsonUtil.serialize(DarkWebAmmoTrader)) as ITraderBase,
            questassort: undefined
        }

        const traderLocales = Object.values(this.db.locales.global) as ILocaleGlobalBase[];
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

    container.resolve<ConfigServer>("ConfigServer").getConfig(ConfigTypes.RAGFAIR).traders[DarkWebAmmoTrader._id] = true;

    }

    private addToHandbook(HandbookID: string, AmmoID: string, Caliber: string)
    {
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID]
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"]
        const CurrentBuyPrice = this.numberCast(AdvAmmoConfig["Buy Price"], 0) * this.numberCast(SimAmmoConfig["Buy Price Multiplier"], 0)

        this.db.templates.handbook.Items.push(
            {

                "Id": AmmoID,
                "ParentId": HandbookID,
                "Price": CurrentBuyPrice * this.numberCast(SimAmmoConfig["Sell Price Multiplier"], 0)

            }
        )
    }

    private addToLocale(id: string, Name: string, shortname: string, description: string)
    {
        const locales = this.db.locales.global.en;
        locales.templates[id] =
            {
                "Name": Name,
                "ShortName": shortname,
                "Description": description
            }
    }

    private addToPrices(AmmoID: string, Caliber: string)
    {
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID]
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"]
        const CurrentBuyPrice = this.numberCast(AdvAmmoConfig["Buy Price"], 0) * this.numberCast(SimAmmoConfig["Buy Price Multiplier"], 0)

        this.db.templates.prices[AmmoID] = CurrentBuyPrice * this.numberCast(SimAmmoConfig["Flea Price Multiplier"], 0)
    }

    addToCylinder(itemId: string, ammoToAdd: string) 	
    {	
        const weaponID = this.db.templates.items[itemId];	
        for (const index in weaponID._props.Slots)	
        {	
            if (this.log) this.logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan");	
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
            if (this.log) this.logger.log("Adding " + ammoToAdd + " to " + weaponID._name, "cyan");
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

    private addAmmoToAllMags(caliber: string, ammo: string)
    {
        for (const item in this.db.templates.items)
        {
            if (this.db.templates.items[item]._props.Chambers != undefined && this.db.templates.items[item]._props.ammoCaliber == caliber)
            {
                if (this.debug) console.log(item);
                for (const slotIndex in this.db.templates.items[item]._props.Slots)
                {
                    if (this.db.templates.items[item]._props.Slots[slotIndex]._name == "mod_magazine")
                    {
                        for (const mags in this.db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter)
                        {
                            if (this.debug) console.log("Magazine: " + this.db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags]);
                            this.addToMagazine(this.db.templates.items[item]._props.Slots[slotIndex]._props.filters[0].Filter[mags], ammo);    
                        }
                        
                    }
                }
                
            }
        }
    }

    private addToWeaponChamber(weapon: string, ammoToAdd: string)
    {
        const weaponID = this.db.templates.items[weapon];
        if (weaponID._props.Chambers?.[0]?._props != undefined)
        {
	            for (const index in weaponID._props.Chambers)	
            {	
                if (this.debug) this.logger.log("Adding " + ammoToAdd + " to " + this.db.templates.items[weapon]._name, "cyan")	
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
        //if (this.debug) this.logger.log(newFilters, "cyan");
    }

    private addToMagazine(magazine:string, ammoToAdd:string)
    {
	    //this.logger.logWithColor(magazine, LogTextColor.GREEN);	
        if (this.db.templates.items[magazine] != undefined)
        {
            const magazineID = this.db.templates.items[magazine];
            //this.logger.logWithColor(this.db.templates.items[magazine]._id, LogTextColor.RED)
            if (magazineID._props.Cartridges?.[0]?._props != undefined)
            {
                if (this.debug) this.logger.log("Adding " + ammoToAdd + " to " + this.db.templates.items[magazine]._name, "cyan")
	                const z_Filter = magazineID._props.Cartridges[0]._props.filters[0].Filter;
                z_Filter.push.apply(z_Filter, [ammoToAdd]);
                const newFilters = [
                    {
                        Filter: z_Filter,
                        ExcludedFilter: []
                    }
                ];
	            if (this.log) this.logger.logWithColor(magazineID._name, LogTextColor.GREEN);	
                if (this.log) this.logger.logWithColor(ammoToAdd, LogTextColor.YELLOW)
                magazineID._props.Cartridges[0]._props.filters = newFilters;
            }
			
        }
		
        //if (this.debug) this.logger.log(newFilters, "red");
    }

    private addToSlot(id: string, ammoToAdd: string)	
    {	
        const weaponOrMagID = this.db.templates.items[id];	
        if (weaponOrMagID._props.Slots != undefined && weaponOrMagID._id != "60db29ce99594040e04c4a27" && weaponOrMagID._id != "624c2e8614da335f1e034d8c" && weaponOrMagID._id != "61a4c8884f95bc3b2c5dc96f")	
        {	
            if (weaponOrMagID._props.Slots?.[0]?._props != undefined)	
            {	
                for (const index in weaponOrMagID._props.Slots)	
                {	
                    if (this.debug) this.logger.log("Adding " + ammoToAdd + " to " + this.db.templates.items.weaponOrMagID._name, "cyan")	
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

    private addAmmoToAllChambers(caliber: string, ammo: string)
    {
        for (const item in this.db.templates.items)
        {
            if (this.db.templates.items[item]._props.Chambers != undefined && this.db.templates.items[item]._props.ammoCaliber == caliber)
            {

                this.addToWeaponChamber(this.db.templates.items[item]._id, ammo);
            }
        }
    }

    private addAmmoToAllSlots(caliber: string, ammo: string)	
    {	
        for (const item in this.db.templates.items)	
        {	
            if (this.db.templates.items[item]._props.Slots != undefined && this.db.templates.items[item]._props.ammoCaliber == caliber)	
            {	
                this.addToSlot(this.db.templates.items[item]._id, ammo);	
            }	
        }	
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

    private showWeaponMod()
    {
        const newArray = [];
        for (const item in this.db.templates.items)
        {
            if (this.db.templates.items[item]._props.Slots != undefined)
            {   
                for (const slot in this.db.templates.items[item]._props.Slots)
                {
                    if (newArray.includes(this.db.templates.items[item]._props.Slots[slot]._name))
                    {
                        //
                    }
                    else
                    {
                        newArray.push(this.db.templates.items[item]._props.Slots[slot]._name);
                    }
                }
                
            }
        }
        if (this.log) this.logger.logWithColor("Weapon Slot Names", LogTextColor.CYAN);
        if (this.log) this.logger.logWithColor(newArray, LogTextColor.RED);
    }

    private showCaliber()
    {
        const ILLEGALArray = [];
        for (const item in this.db.templates.items)
        {
            
            if (this.db.templates.items[item]._props.ammoCaliber != undefined)
            {   
                //console.log(this.db.templates.items[item]._props.ammoCaliber);
                if (ILLEGALArray.includes(this.db.templates.items[item]._props.ammoCaliber))
                {
                    //console.log("AlreadyInList");
                }
                else
                {
                    ILLEGALArray.push(this.db.templates.items[item]._props.ammoCaliber);
                }
            }
        }
        if (this.debug) this.logger.logWithColor("Ammo Calibers", LogTextColor.GREEN);
        if (this.debug) this.logger.logWithColor(ILLEGALArray, LogTextColor.RED);
    }

            //Remove Ammo From Secured Containers Start
    private addToContainerBlacklist(ContainerBlacklistID: string, AmmoID: string, Caliber: string)
    {
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID];
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];
        const TrueBool = ["true", true];
        const FalseBool = ["false", false];
        
        for (let id in this.db.templates.items)
        {
            if (FalseBool.includes(AdvAmmoConfig["Removed From Secured Container"]))
            {
                //Do nothing
            }
            else
            {
                if (TrueBool.includes(AdvAmmoConfig["Removed From Secured Container"]))
                {
                    if (this.db.templates.items[id]._parent == ContainerBlacklistID && this.db.templates.items[id]._props.Grids[0]._props.filters[0] !== undefined)
                    {
                        this.db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                    }
                }
                else
                {
                    if (FalseBool.includes(SimAmmoConfig["Remove ALL From Secured Container"]))
                    {
                        //Do nothing
                    }
                    else
                    {
                        if (TrueBool.includes(SimAmmoConfig["Remove ALL From Secured Container"]))
                        {
                            if (this.db.templates.items[id]._parent == ContainerBlacklistID && this.db.templates.items[id]._props.Grids[0]._props.filters[0] !== undefined)
                            {
                                this.db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                            }
                        }
                        else
                        {
                            if (this.db.templates.items[id]._parent == ContainerBlacklistID && this.db.templates.items[id]._props.Grids[0]._props.filters[0] !== undefined)
                            {
                                this.logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Remove ALL From Secured Container\" AND \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Removed From Secured Container\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.RED);	
                                this.db.templates.items[id]._props.Grids[0]._props.filters[0].ExcludedFilter.push(AmmoID);
                            } 
                        }
                    }
                }
            }
        }
    }


    private GetProbabiliySum(): number[]
    {
    let StaticLoot = this.db.loot.staticLoot
    var Containers = ["5d07b91b86f7745a077a9432", "578f8782245977354405a1e3", "5c052cea86f7746b2101e8d8", "5914944186f774189e5e76c2",   "5909e4b686f7747f5b744fa4", "5909d45286f77465a8136dc6",   "5d6d2bb386f774785b07a77a", "5d6d2b5486f774785c2ba8ea", "578f87ad245977356274f2cc",   "5909d7cf86f77470ee57d75a", "5909d5ef86f77467974efbd8", "5909d89086f77472591234a0", "5909d76c86f77471e53d2adf", "578f87a3245977356274f2cb", "578f8778245977358849a9b5"]
    const SimAmmoConfig = this.modConfig["Simple Ammunition Config"]

    let DesiredProbability = SimAmmoConfig["Spawn Chance Decimal"]
    let ProbabilitySum = 0
    let Probabilities:  number[] = [];

    if (this.numberCast(SimAmmoConfig["Spawn Chance Decimal"], 0) >= 1)
    {
        DesiredProbability = 0.999999999
    }
    if (this.numberCast(SimAmmoConfig["Spawn Chance Decimal"], 0) < 0)
    {
        DesiredProbability = 0.000000001
    }
    
    var containerToCheck = StaticLoot[Containers]

    for (let i = 0; i < Containers.length; i++) {
    containerToCheck = StaticLoot[Containers[i]]
    for (let item of containerToCheck.itemDistribution) {
    ProbabilitySum += item.relativeProbability
    }
    //console.log(`ProbabilitySum: ${ProbabilitySum}`)
    Probabilities.push ( (ProbabilitySum / ((1 - DesiredProbability) * 100) )  * DesiredProbability * 100);
    //console.log(`Probability: ${Probabilities}`)
    }
    return Probabilities;
    }

    private calculateLootChances(AmmoID: string, Caliber: string, PriceSumIn: number,In_ProbabilityToUse: number[]): number[]
    {
        var Containers = ["5d07b91b86f7745a077a9432", "578f8782245977354405a1e3", "5c052cea86f7746b2101e8d8", "5914944186f774189e5e76c2",   "5909e4b686f7747f5b744fa4", "5909d45286f77465a8136dc6",   "5d6d2bb386f774785b07a77a", "5d6d2b5486f774785c2ba8ea", "578f87ad245977356274f2cc",   "5909d7cf86f77470ee57d75a", "5909d5ef86f77467974efbd8", "5909d89086f77472591234a0", "5909d76c86f77471e53d2adf", "578f87a3245977356274f2cb", "578f8778245977358849a9b5"]
        let Probabilities:  number[] = [];

        
        for (let i = 0; i < Containers.length; i++) {
        let relativeProbabilityToUse = In_ProbabilityToUse[i];
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID]
        let BuyPrice = AdvAmmoConfig["Buy Price"];
        let PriceSum = PriceSumIn;

        let Probability = (1 - (BuyPrice / PriceSum)) * relativeProbabilityToUse
        Probabilities.push(Probability);

        //console.log(`Probability: ${Probability}`)
    }
        return Probabilities;
    }


    private createLootTables(AmmoID: string,In_Table: number[])
    {
        var ChanceMUlitplierVariant = [1,1,1,1,1/3,1/3,1/6,1/6,1/6,0.1,0.1,0.1,0.1,0.1,0.1]
        var Containers = ["5d07b91b86f7745a077a9432", "578f8782245977354405a1e3", "5c052cea86f7746b2101e8d8", "5914944186f774189e5e76c2",   "5909e4b686f7747f5b744fa4", "5909d45286f77465a8136dc6",   "5d6d2bb386f774785b07a77a", "5d6d2b5486f774785c2ba8ea", "578f87ad245977356274f2cc",   "5909d7cf86f77470ee57d75a", "5909d5ef86f77467974efbd8", "5909d89086f77472591234a0", "5909d76c86f77471e53d2adf", "578f87a3245977356274f2cb", "578f8778245977358849a9b5"]
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"]

        for (let i = 0; i < Containers.length; i++) {
        this.addToStaticLoot(Containers[i], AmmoID, In_Table[i] * ChanceMUlitplierVariant[i] * this.numberCast(SimAmmoConfig["Spawn Chance Multiplier"], 0));
        //console.log(`In_Table: ${In_Table[i]}`)
        }

    } 


    private addToStaticLoot(containerID:string, itemToAdd:string, probability:number)
    {
        const lootContainter = this.db.loot.staticLoot[containerID];
        const lootDistr = lootContainter.itemDistribution;
                
        const newLoot = [
            {
                tpl: itemToAdd,
                relativeProbability: probability
            }
        ]
        for (const lootItem of newLoot)
        {
            lootDistr.push.apply(lootDistr, [lootItem]);
        }
        lootContainter.itemDistribution = lootDistr;
        //if (this.debug) this.logger.log([lootContainter], "green");
    }

		
		//future automation
		//Small Caliber
		/*AmmoPath._props.MisfireChance = SmallEquationResult;
        AmmoPath._props.MalfMisfireChance = SmallEquationResult;
        AmmoPath._props.DurabilityBurnModificator = SmallEquationResult;
        AmmoPath._props.HeatFactor = SmallEquationResult;
        AmmoPath._props.MalfFeedChance = SmallEquationResult;*/
		//Medium Caliber
		/*AmmoPath._props.MisfireChance = MediumEquationResult;
        AmmoPath._props.MalfMisfireChance = MediumEquationResult;
        AmmoPath._props.DurabilityBurnModificator = MediumEquationResult;
        AmmoPath._props.HeatFactor = MediumEquationResult;
        AmmoPath._props.MalfFeedChance = MediumEquationResult;*/
		//Large Caliber
		/*AmmoPath._props.MisfireChance = LargeEquationResult;
        AmmoPath._props.MalfMisfireChance = LargeEquationResult;
        AmmoPath._props.DurabilityBurnModificator = LargeEquationResult;
        AmmoPath._props.HeatFactor = LargeEquationResult;
        AmmoPath._props.MalfFeedChance = LargeEquationResult;*/
		//Special Caliber
		/*AmmoPath._props.MisfireChance = SpecialEquationResult;
        AmmoPath._props.MalfMisfireChance = SpecialEquationResult;
        AmmoPath._props.DurabilityBurnModificator = SpecialEquationResult;
        AmmoPath._props.HeatFactor = SpecialEquationResult;
        AmmoPath._props.MalfFeedChance = SpecialEquationResult;*/
			
        //CHECK ADD FUNCTIONS FOR ADVANCED STATS
			
			//Define Ammo Stats Start
	private cloneAmmo(AmmoToClone: string, AmmoID: string, Caliber: string)
    {
        this.cloneItem(AmmoToClone, AmmoID);
        const AmmoPath = this.db.templates.items[AmmoID];
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID];
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];
        const GenConfig = this.modConfig["General Config"];
        const GlobalMultiplier = this.numberCast(SimAmmoConfig["All Stats Multiplier"], 1);
        const Colors = ["blue", "yellow", "green", "red", "black", "grey", "violet", "orange", "tracerYellow", "tracerGreen", "tracerRed"];
        const FragmentTypes = ["Weakest Illegal Shrapnel", "Weak Illegal Shrapnel", "Medium Illegal Shrapnel", "Strong Illegal Shrapnel", "Strongest Illegal Shrapnel", "5996f6fc86f7745e585b4de3"]
        const ExplosionTypes = ["big_round_impact", "big_round_impact_explosive", "smallgrenade_expl"]
        const Bool = ["true", "false", true, false];
        
        //Booleans
        if (Bool.includes(AdvAmmoConfig["Removed From Flea Market"]))
        {
            AmmoPath._props.CanSellOnRagfair = !this.castBool(AdvAmmoConfig["Removed From Flea Market"]); 
        }
        else
        {
            if (Bool.includes(SimAmmoConfig["Remove ALL From Flea Market"]))
            {
                AmmoPath._props.CanSellOnRagfair = !this.castBool(SimAmmoConfig["Remove ALL From Flea Market"]);
            }
            else
            {
                this.logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Remove ALL From Flea Market\" AND \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Removed From Flea Market\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.RED);	
                AmmoPath._props.CanSellOnRagfair = !true;
            }
        }

        if (Bool.includes(AdvAmmoConfig["Tracer On"]))
        {
            AmmoPath._props.Tracer = this.castBool(AdvAmmoConfig["Tracer On"]); 
        }
        else
        {
            if (Bool.includes(SimAmmoConfig["Tracer On"]))
            {
                AmmoPath._props.Tracer = this.castBool(SimAmmoConfig["Tracer On"]);
            }
            else
            {
                this.logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Tracer On\" AND \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Removed From Flea Market\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.RED);	
                AmmoPath._props.Tracer = true;
            }
        }

        if (Bool.includes(AdvAmmoConfig["Mod Compatibility"]["Add Bullet To Fin's AI Tweaks (FAIT) Bot Loadouts"]))
        {
            AmmoPath._props.Finallowed = this.castBool(AdvAmmoConfig["Mod Compatibility"]["Add Bullet To Fin's AI Tweaks (FAIT) Bot Loadouts"]); 
        }
        else
        {
            if (Bool.includes(this.modConfig["Mod Compatibility"]["Add ALL Bullets To Fin's AI Tweaks (FAIT) Bot Loadouts"]))
            {
                AmmoPath._props.Finallowed = this.castBool(this.modConfig["Mod Compatibility"]["Add ALL Bullets To Fin's AI Tweaks (FAIT) Bot Loadouts"]);
            }
            else
            {
                this.logger.logWithColor("ERROR: BOTH THE config.json ENTRIES: \"Simple Ammunition Config\" → \"Mod Compatibility\" → \"Add ALL Bullets To Fin's AI Tweaks (FAIT) Bot Loadouts\" AND \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Mod Compatibility\" → \"Add ALL Bullets To Fin's AI Tweaks (FAIT) Bot Loadouts\" ARE CONFIGURED WRONG. DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO EITHER \"true\" OR \"false\" AND THE LATTER TO \"true\", \"false\" OR \"\" WITH PARANTHESIS INCLUDED, FOR PROPER CONFIGURATION OF SETTINGS", LogTextColor.RED);	
                AmmoPath._props.Finallowed = false;
            }
        }

        //Multiple Options
        if (Colors.includes(AdvAmmoConfig["Icon Color"]))
        {
            AmmoPath._props.BackgroundColor = AdvAmmoConfig["Icon Color"];
        }
        else
        {
            if (Colors.includes(SimAmmoConfig["Icon Color"]))
            {
                AmmoPath._props.BackgroundColor = SimAmmoConfig["Icon Color"];
            }
            else
            {
                this.logger.logWithColor("ERROR: NO BACKGROUND COLOR OPTION FOUND FOR "+String(AmmoID)+" IN config.json ENTRIES: \"Simple Ammunition Config\" → \"Icon Color\" OR \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Icon Color\". DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO ANY OF THESE COLORS \"blue\", \"yellow\", \"green\", \"red\", \"black\", \"grey\", \"violet\", \"orange\", \"tracerYellow\", \"tracerGreen\" OR \"tracerRed\" PARANTHESIS INCLUDED, AND THE LATTER TO ANY DESIRED COLOR FOR THAT SPECIFIC AMMO, OR \"\" TO USE THE COLOR FROM \"Simple Ammunition Config\".", LogTextColor.RED);	
                AmmoPath._props.BackgroundColor = "red";
            }
        }

        if (Colors.includes(AdvAmmoConfig["Tracer Color"]))
        {
            AmmoPath._props.TracerColor = AdvAmmoConfig["Tracer Color"];
        }
        else
        {
            if (Colors.includes(SimAmmoConfig["Tracer Color"]))
            {
                AmmoPath._props.TracerColor = SimAmmoConfig["Tracer Color"];
            }
            else
            {
                this.logger.logWithColor("ERROR: NO COLOR OPTION FOUND FOR "+String(AmmoID)+" IN config.json ENTRIES: \"Simple Ammunition Config\" → \"Tracer Color\" OR \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Tracer Color\". DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET THE FORMER TO ANY OF THESE COLORS \"blue\", \"yellow\", \"green\", \"red\", \"black\", \"grey\", \"violet\", \"orange\", \"tracerYellow\", \"tracerGreen\" OR \"tracerRed\" PARANTHESIS INCLUDED, AND THE LATTER TO ANY DESIRED COLOR FOR THAT SPECIFIC AMMO, OR \"\" TO USE THE COLOR FROM \"Simple Ammunition Config\".", LogTextColor.RED);	
                AmmoPath._props.TracerColor = "red";
            }
        }

        //Set Regular Stats Ammunition
        AmmoPath._props.Damage = (this.numberCast(AdvAmmoConfig["Damage"], 0) + this.numberCast(AdvAmmoConfig["Damage Per Pellet"], 0)) * (this.numberCast(SimAmmoConfig["Damage Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.PenetrationPower = this.numberCast(AdvAmmoConfig["Armor Penetration"], 0) * (this.numberCast(SimAmmoConfig["Armor Penetration Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.ArmorDamage = this.numberCast(AdvAmmoConfig["Damage To Armor"], 0) * (this.numberCast(SimAmmoConfig["Damage To Armor Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.ammoAccr = this.numberCast(AdvAmmoConfig["Accuracy"], 0) * (this.numberCast(SimAmmoConfig["Accuracy Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.ammoRec = this.numberCast(AdvAmmoConfig["Recoil"], 0) * (this.numberCast(SimAmmoConfig["Recoil Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.FragmentationChance = this.numberCast(AdvAmmoConfig["Fragmentation Chance"], 0) * (this.numberCast(SimAmmoConfig["Fragmentation Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.RicochetChance = this.numberCast(AdvAmmoConfig["Ricochet Chance"], 0) * (this.numberCast(SimAmmoConfig["Ricochet Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.LightBleedingDelta = this.numberCast(AdvAmmoConfig["Light Bleed Chance"], 0) * (this.numberCast(SimAmmoConfig["Light Bleed Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.HeavyBleedingDelta = this.numberCast(AdvAmmoConfig["Heavy Bleed Chance"], 0) * (this.numberCast(SimAmmoConfig["Heavy Bleed Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.InitialSpeed = this.numberCast(AdvAmmoConfig["Bullet Velocity"], 0) * (this.numberCast(SimAmmoConfig["Bullet Velocity Multiplier"], 1) * GlobalMultiplier);
	    AmmoPath._props.MisfireChance = this.numberCast(AdvAmmoConfig["Misfire Chance"], 0) * (this.numberCast(SimAmmoConfig["Misfire Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.MalfMisfireChance = this.numberCast(AdvAmmoConfig["Misfire Chance"], 0) * (this.numberCast(SimAmmoConfig["Misfire Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.MalfFeedChance = this.numberCast(AdvAmmoConfig["Failure To Feed Chance"], 0) * (this.numberCast(SimAmmoConfig["Failure To Feed Chance Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.DurabilityBurnModificator = this.numberCast(AdvAmmoConfig["Durability Burn"], 0) * (this.numberCast(SimAmmoConfig["Durability Burn Multiplier"], 1) * GlobalMultiplier);
        AmmoPath._props.HeatFactor = this.numberCast(AdvAmmoConfig["Heat"], 0) * (this.numberCast(SimAmmoConfig["Heat Multiplier"], 1)) * GlobalMultiplier;

        //Set Buckshot Ammunition
        AmmoPath._props.buckshotBullets = this.numberCast(AdvAmmoConfig["Buckshot Pellets"], 0);
        AmmoPath._props.ProjectileCount = this.numberCast(AdvAmmoConfig["Buckshot Pellets"], 1);

        //Set Explosive Ammunition
        if (this.castBool(AdvAmmoConfig["Explosive"]) == true)
        {
            AmmoPath._props.ammoType = "grenade",
            AmmoPath._props.HasGrenaderComponent = true;
            AmmoPath._props.ShowHitEffectOnExplode = true;
            AmmoPath._props.FragmentsCount = this.numberCast(AdvAmmoConfig["Fragments"], 0);

            if (ExplosionTypes.includes(AdvAmmoConfig["Explosion Type"]))
            {
                AmmoPath._props.ExplosionType = AdvAmmoConfig["Explosion Type"]
            }
            else
            {
                AmmoPath._props.ExplosionType = "big_round_impact_explosive";
            }

            if (AdvAmmoConfig["Fuze Time"] == null)
            {
                AmmoPath._props.FuzeArmTimeSec = 0;
            }
            else
            {
                AmmoPath._props.FuzeArmTimeSec = AdvAmmoConfig["Fuze Time"]
            }

            AmmoPath._props.ExplosionStrength = this.numberCast(AdvAmmoConfig["Explosion Strength"], 0);
            AmmoPath._props.MinExplosionDistance = this.numberCast(AdvAmmoConfig["Minimum Explosion Distance"], 0);
            AmmoPath._props.MaxExplosionDistance = this.numberCast(AdvAmmoConfig["Maximum Explosion Distance"], 0);

            if (FragmentTypes.includes(AdvAmmoConfig["Fragment Type"]))
            {
                AmmoPath._props.FragmentType = AdvAmmoConfig["Fragment Type"];
            }
            else
            {
                this.logger.logWithColor("ERROR: NO FRAGMENT TYPE FOUND FOR "+String(AmmoID)+" IN config.json ENTRY: \"Advanced Ammunition Config\" → \""+String(Caliber)+"\" → \""+String(AmmoID)+"\" → \"Tracer Color\". DEFAULT SETTINGS AUTOMATICALLY RESTORED. PLEASE SET IT TO ANY OF THESE FRAGMENT TYPES \"Weakest Illegal Shrapnel\", \"Weak Illegal Shrapnel\", \"Medium Illegal Shrapnel\", \"Strong Illegal Shrapnel\" OR \"Strongest Illegal Shrapnel\" PARANTHESIS INCLUDED.", LogTextColor.RED);	
                AmmoPath._props.FragmentType = "Weak Illegal Shrapnel";
            }
        }
        else
        {
            AmmoPath._props.HasGrenaderComponent = false;
        }

        //Set Flashbang Ammunition
        if (this.castBool(AdvAmmoConfig["Flashbang"]) == true)
        {
            AmmoPath._props.IsLightAndSoundShot = this.castBool(AdvAmmoConfig["Flashbang"]); 
            AmmoPath._props.LightAndSoundShotAngle = this.numberCast(AdvAmmoConfig["Flashbang Angle"], 160);
            AmmoPath._props.LightAndSoundShotSelfContusionTime = this.numberCast(AdvAmmoConfig["Self Contusion Time"], 7);
            AmmoPath._props.LightAndSoundShotSelfContusionStrength = this.numberCast(AdvAmmoConfig["Self Contusion Strength"], 0.3);
        }
        else
        {
            AmmoPath._props.IsLightAndSoundShot = false;
        }

        AmmoPath._props.StackMaxRandom = AmmoPath._props.StackMaxSize * this.numberCast(SimAmmoConfig["Spawn Stack Size Multiplier"], 0)
        AmmoPath._props.StackMinRandom = AmmoPath._props.StackMaxSize / 10 * this.numberCast(SimAmmoConfig["Spawn Stack Size Multiplier"], 0)
        AmmoPath._props.LootExperience = (AmmoPath._props.LootExperience + 250) * this.numberCast(SimAmmoConfig["Loot Experience Multiplier"], 0)
        AmmoPath._props.ExamineExperience = (AmmoPath._props.ExamineExperience + 490) * this.numberCast(SimAmmoConfig["Examine Experience Multiplier"], 0)

        AmmoPath._props.RagFairCommissionModifier = this.numberCast(GenConfig["Flea Market Fee Multiplier"], 1) * 7;
		AmmoPath._props.TracerDistance = 0.1 * (this.numberCast(SimAmmoConfig["Tracer Length Multiplier"], 1));
        if (this.log) this.logger.logWithColor("Ammo " + AmmoPath._id + " Added", LogTextColor.GREEN);
        
    }
			//Define Ammo Stats End

			
			//Creating Trader Setting Dependencies Start
    private cloneItem(itemtoClone:string, newitemID:string)
    {
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const itemToAdd = newitemID;
        this.db.templates.items[itemToAdd] = JsonUtil.clone(this.db.templates.items[itemtoClone]);
        this.db.templates.items[itemToAdd]._id = itemToAdd;
        
        if (this.debug) this.logger.logWithColor(this.db.templates.items[itemtoClone]._name + " cloned", LogTextColor.GREEN);
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
    
    private addToAssortTable(Itrade: ITraderAssort ,AmmoID: string, Caliber: string, DefaultLoyaltyLevel: string): ITraderAssort
    {
        const ROUBLE_ID = "5449016a4bdc2d6f028b456f";
        const AdvAmmoConfig = this.modConfig["Advanced Ammunition Config"][Caliber][AmmoID];
        const SimAmmoConfig = this.modConfig["Simple Ammunition Config"];


        const TraderStock: Item = {
            _id: AmmoID,
            _tpl: AmmoID,
            parentId: "hideout",
            slotId: "hideout",
            upd: {
                UnlimitedCount: true,
                StackObjectsCount: 999999,
			    BuyRestrictionMax: this.numberCast(AdvAmmoConfig["Buy Restriction Amount"], 0) * this.numberCast(SimAmmoConfig["Buy Restriction Amount Multiplier"], 1),
			    BuyRestrictionCurrent: 0
            }
        };

        Itrade.items.push(TraderStock);

        Itrade.barter_scheme[AmmoID] = [
            [
                {
                    count: this.numberCast(AdvAmmoConfig["Buy Price"], 0) * this.numberCast(SimAmmoConfig["Buy Price Multiplier"], 1),
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
                if (this.log) this.logger.logWithColor("No custom configuration of \"Loyalty Level Requirement\" found for "+String(AmmoID)+" using hidden default settings.", LogTextColor.CYAN);	
                Itrade.loyal_level_items[AmmoID] = DefaultLoyaltyLevel;
            }
        }
    }



    private castBool(InString: String): boolean
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

    private numberCast(InThing: any, Default: number): number
    {
        if (typeof InThing === 'number')
        {
            //very happy :3   
        }
        else
        {
            //Very angery
            if (this.log) this.logger.logWithColor("Config Value Incorrect type : "+String(InThing), LogTextColor.RED);
        }
    

        let _Tcast=Number(InThing); let _Default=Number(Default);
    
        if (_Default==null || isNaN(_Default))
        {
            if (this.log) this.logger.logWithColor("Coding error", LogTextColor.RED);
            _Default=0;
        }


        if (isNaN(_Tcast) || _Tcast==null)
        {
            _Tcast=_Default;
            if (this.log) this.logger.logWithColor("Valid value not set for _default"+InThing, LogTextColor.RED);
        }

    return Number(_Tcast);

    }

}

    module.exports = { mod: new ILLEGALAmmo() }