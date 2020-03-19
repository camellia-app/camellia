export default abstract class Bookmark {
  public readonly browserId: string;

  public readonly title: string;

  protected constructor(
    browserId: string,
    title: string,
  ) {
    this.browserId = browserId;
    this.title = title;
  }
}
