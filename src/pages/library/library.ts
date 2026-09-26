import {
  FilterCardTypes,
  initFilterCardTypes,
} from '@/components/filter/card-types/filter-card-types';
import {
  FilterCardRatings,
  initFilterCardRatings,
} from '@/components/filter/rating/filter-card-ratings';
import { GAME_FILTERS } from '@/constants';
import './library.scss';
export function Library(): string {
  return `
        <div class="library_content">
            <div class="library_inner_content">
                <div class="library_header_content">
                    <h1>Game Library</h1>
                    <p>Browse our collection of casual mini-games</p>
                </div>
                <div class="games_section">
                    <div class="library_filter_content">
                        <div class="sort_by_type_section">
                            ${FilterCardTypes(GAME_FILTERS)}
                        </div>
                        <div class="sort_by_type_ratings">
                            ${FilterCardRatings()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initLibrary(): void {
  initFilterCardTypes();
  initFilterCardRatings();
}
