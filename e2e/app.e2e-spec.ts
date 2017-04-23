import { APMRoutedPage } from './app.po';

describe('apm-routed App', () => {
  let page: APMRoutedPage;

  beforeEach(() => {
    page = new APMRoutedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
