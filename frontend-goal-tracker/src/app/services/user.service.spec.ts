import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environment';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure there are no outstanding HTTP requests after each test
  });

  it('should send updated user data and return updated user information', () => {
    const testUser: any = { id: 1, name: 'Jane Doe', email: 'jane@example.com', password: 'newpassword', photo: 'path/to/photo' };
    const id = testUser.id;

    service.updateUser(id, testUser).subscribe(user => {
      expect(user).toEqual(testUser);
    });

    const testRequest = httpTestingController.expectOne(`${environment.apiUrl}/users/${id}`);
    expect(testRequest.request.method).toBe('PATCH');
    expect(testRequest.request.body.get('email')).toBe('jane@example.com');
    testRequest.flush(testUser);
  });

  it('should register a new user and return user data', () => {
    const newUser: any = { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456' };

    service.register(newUser.name, newUser.email, newUser.password).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456'
    });
    req.flush(newUser);
  });
});