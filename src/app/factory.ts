/**
 * 유저의 종류: 프리미엄 유저, 프리 유저, 트라이얼 유저
 * 권한 체크: 권한을 체크하는 로직이 다 다름
 * 공통 기능 - login, logout, 읽기
 * 프리미엄 유저 - 내보내기, 임포트
 */

enum UserKind {
  FREE,
  TRIAL,
  PREMIUM,
}

type TUser = {
  id: string;
  name: string;
  type: UserKind;
};

class UserFactory<T = User> {
  private readonly userClass: new (...args: any) => T;

  constructor(userClass: new (...args: any) => T) {
    this.userClass = userClass;
  }

  create(user: TUser) {
    return new this.userClass(user);
  }
}

abstract class User {
  id: TUser['type'];

  abstract read(): string;

  abstract create(): string;

  protected constructor(id: TUser['type']) {
    this.id = id;
  }
}

class Premium extends User {
  constructor() {
    super(UserKind.PREMIUM);
  }

  create(): string {
    return '';
  }

  read(): string {
    return '';
  }
}

class Free extends User {
  constructor() {
    super(UserKind.FREE);
  }

  create(): string {
    return '';
  }

  read(): string {
    return '';
  }
}

class Trial extends User {
  constructor() {
    super(UserKind.TRIAL);
  }

  create(): string {
    return '';
  }

  read(): string {
    return '';
  }
}

const p = new UserFactory(Premium);
p.create({ id: 'premium', name: 'premium user', type: UserKind.PREMIUM });

const f = new UserFactory(Free);
f.create({ id: 'free', name: 'free name', type: UserKind.FREE });
