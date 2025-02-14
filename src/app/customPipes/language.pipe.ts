import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  language: { [key: string]: string } = {
    English: 'en',
    Russian: 'ru',
    French: 'fr',
    German: 'de',
    Korean: 'ko',
    Spanish: 'es',
    Chinese: 'zh',
    Creole: 'ht',
  };

  transform(value: string): string {
    const languageName = Object.keys(this.language).find(
      key => this.language[key] === value
    );
    return languageName || value;
  }

}
