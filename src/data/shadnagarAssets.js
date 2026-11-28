// Images live in public/shadnagar-premium-avenue.
// Add or replace a file in the matching folder, then refresh:
//   slider, project-plan, location-advantage, rate-card, brochure, Project Highlights
import { shadnagarFolders } from 'virtual:shadnagar-assets'

const list = (folder) => shadnagarFolders[folder] || []
const highlightByNumber = (n) => list('Project Highlights').find((src) => src.includes(`/img${n}.`)) || ''

export const shadnagarAssets = {
  slider: list('slider'),
  brochure: list('brochure'),
  projectPlan: list('project-plan')[0] || '',
  locationAdvantage: list('location-advantage')[0] || '',
  rateCard: list('rate-card')[0] || '',
  highlights: list('Project Highlights'),
  highlightByNumber,
}
