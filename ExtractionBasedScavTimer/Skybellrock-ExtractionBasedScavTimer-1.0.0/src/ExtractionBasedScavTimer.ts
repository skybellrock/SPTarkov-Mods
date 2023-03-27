import type{ DependencyContainer } from "tsyringe"
import type{ IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod"
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod"
import type { DatabaseServer } from "@spt-aki/servers/DatabaseServer"
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService"
import type { ProfileHelper } from "@spt-aki/helpers/ProfileHelper"

class ExtractionBasedScavTimer implements IPreAkiLoadMod, IPostDBLoadMod
{
  private container: DependencyContainer
  private config = require("../config/config.json")

public preAkiLoad(container: DependencyContainer):void
  {
    this.container = container
    const staticRouterModService = this.container.resolve<StaticRouterModService>("StaticRouterModService")
    staticRouterModService.registerStaticRouter(
      "ExtractionBasedScavTimer",
      [{
        url: "/raid/profile/save",
        action: (url :string, info :any, sessionId :string, output :string) => 
        {
          const profileHelper = this.container.resolve<ProfileHelper>("ProfileHelper")
          const scavProfile = profileHelper.getScavProfile(sessionId)
          this.setSpawnDelay(info, scavProfile)
          return output
        }
      }],"aki")
  }
  
  private setSpawnDelay(info :any, scavProfile :any):void
  {
    const gConfig = this.container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config
    if (info.isPlayerScav === false)
    {
      switch (info.exit)
      {
        case "survived":
          scavProfile.Info.SavageLockTime += this.config.scavTimeSurviveModifier * 60
          break

        case "runner":
          scavProfile.Info.SavageLockTime += this.config.scavTimeRunThroughModifier * 60
          break

        case "killed":
          scavProfile.Info.SavageLockTime += this.config.scavTimeDeadModifier * 60
          break

        default:
          gConfig.SavagePlayCooldown = this.config.baseScavResetTime * 60
          break
      }
    }
  }

  public postDBLoad(container: DependencyContainer):void
  {
    this.container = container
    const gConfig = this.container.resolve<DatabaseServer>("DatabaseServer").getTables().globals.config
    gConfig.SavagePlayCooldown = this.config.baseScavResetTime * 60
  }  
}

module.exports = {mod: new ExtractionBasedScavTimer()}