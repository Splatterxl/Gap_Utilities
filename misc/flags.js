module.exports = class Flags {
  _found = false;
  /**
   * @private
   */
  _obj;
  /**
   *
   * @param {string} str
   */
  constructor(str) {
    this._obj = this._get(str);
  }
  /**
   * @private
   */
  _regexp = /-{1,2}\b[\w\S]+\b((=|:)?\s*\b(([\w\S\d]+|"[^"]+")))?\b/gi;
  /**
   *
   * @param {string} str
   * @private
   */
  _get(str) {
    let obj = {};
    obj.unfiltered = str;
    obj.levels = [];
    obj.levels.push(str.match(this._regexp)?.map(v => v.slice(1)));
    obj.options = {};
    let currentlvl = obj.levels[0];
    if (!currentlvl) {
      this._obj = null;
      this._found = false;
      return 'ERR! No flags found.';
    } else this._found = true;
    currentlvl = currentlvl
      .map(v => v.replace(/-/g, ''))
      .map(v =>
        v.includes('=')
          ? (obj.options[v.split('=')[0]] = v.split('=')[1])
          : v.includes(' ')
          ? (obj.options[v.split(' ')[0]] = v.split(' ')[1])
          : v.includes(':')
          ? (obj.options[v.split(':')[0]] = v.split(':')[1])
          : v
      );
    obj.levels.push(currentlvl);
    delete obj.levels;
    obj.filtered = str.replace(this._regexp, ' ').trim();
    obj.solo = str
      .match(this._regexp)
      .filter(v => !v.match(/(=| |:)+/))
      .map(v => v.replace(/\b-{1,2}/g, ''));
    Object.keys(obj.options).map(
      v => (obj.options[v] = obj.options[v].replace(/"/g, ''))
    );
    return obj;
  }
  getObj() {
    return this._obj;
  }
  simulate(str) {
    return this._get(str);
  }
  includes(str) {
    try {
      if (
        this._obj.solo?.includes(str) ||
        Object.keys(this._obj.options).includes(str)
      )
        return true;
    } catch {
      return false;
    }
  }
  get(key) {
    return (
      this._obj.options?.[key] ?? (this._obj.solo?.includes?.(key) || undefined)
    );
  }
};
