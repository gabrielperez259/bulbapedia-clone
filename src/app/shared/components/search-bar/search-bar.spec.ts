import { beforeEach, describe, expect, it } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
  
    await fixture.whenStable();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
