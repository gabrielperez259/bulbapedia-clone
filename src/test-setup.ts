import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';

// Configura o TestBed globalmente para operar em modo Zoneless
TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()],
});