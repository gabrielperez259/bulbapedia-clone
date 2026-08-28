import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../../../environments/environment';
import { Header } from '../../../../core/pages/header/header';
import { GenValues } from '../../../../shared/utils/gen-values';
import { PokemonList } from './pokemon-list';

@Component({ template: '' })
class PokemonDetailsStub {}

@Component({ imports: [Header, RouterOutlet], template: '<app-header /><router-outlet />' })
class AppShell {}

describe('Pokemon list navigation', () => {
  let harness: RouterTestingHarness;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([
          {
            path: '',
            component: AppShell,
            children: [
              { path: '', component: PokemonList },
              { path: ':name', component: PokemonDetailsStub },
            ],
          },
        ]),
      ],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('returns to a consistent Gen 1, page 1 state through the header link', async () => {
    await harness.navigateByUrl('/', AppShell);
    const list = harness.fixture.debugElement.query(By.directive(PokemonList))
      .componentInstance as PokemonList;
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });

    list.data.setGeneration(GenValues.GenThree);
    list.data.setPage(2);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}?offset=271&limit=20`).flush({ results: [] });

    await harness.navigateByUrl('/treecko', AppShell);
    const homeLink = harness.fixture.nativeElement.querySelector(
      'app-header a',
    ) as HTMLAnchorElement;
    expect(homeLink.getAttribute('href')).toBe('/');

    await harness.navigateByUrl('/', AppShell);
    TestBed.tick();

    httpTesting.expectOne(`${environment.apiUrl}?offset=0&limit=20`).flush({ results: [] });
    await harness.fixture.whenStable();
    const returnedList = harness.fixture.debugElement.query(By.directive(PokemonList))
      .componentInstance as PokemonList;

    expect(returnedList.data.selectedGeneration()).toBe(GenValues.GenOne);
    expect(returnedList.data.currentPage()).toBe(1);
  });
});
