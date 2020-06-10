import { TestBed } from '@angular/core/testing';
import { NotificacionesBusService } from './notificaciones-bus.service';


describe('NotificacionBusService', () => {
  let service: NotificacionesBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionesBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
