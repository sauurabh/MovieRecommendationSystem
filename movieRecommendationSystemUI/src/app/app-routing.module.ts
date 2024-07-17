import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieRecommendationComponent } from './components/movie-recommendation/movie-recommendation.component';

const routes: Routes = [
  { path: '', redirectTo: '/movieRecommend', pathMatch: 'full' },
  { path: 'movieRecommend', component: MovieRecommendationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
