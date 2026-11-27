// Images live in public/shadnagar-premium-avenue.
// Add or replace a file in the matching folder, then refresh:
//   slider, project-plan, location-advantage, rate-card, brochure
import { shadnagarFolders } from 'virtual:shadnagar-assets'

const list = (folder) => shadnagarFolders[folder] || []

export const shadnagarAssets = {
  slider: list('slider'),
  brochure: list('brochure'),
  projectPlan: list('project-plan')[0] || '',
  locationAdvantage: list('location-advantage')[0] || '',
  rateCard: list('rate-card')[0] || '',
}
