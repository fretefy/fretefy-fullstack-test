import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { distinct, map, take } from 'rxjs/operators';
import { ICidade } from 'src/app/core/models';
import { CidadeService } from 'src/app/core/services';

@Component({
  selector: 'app-cidade-picker',
  templateUrl: './cidade-picker.component.html',
  styleUrls: ['./cidade-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CidadePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CidadePickerComponent),
      multi: true,
    },
  ],
})
export class CidadePickerComponent implements OnInit, ControlValueAccessor {
  public uf: string;
  public cidade: ICidade;

  public ufs$: Observable<string[]>;
  public cidades$: Observable<ICidade[]>;
  private _cidades: Observable<ICidade[]>;

  @Output('change') change = new EventEmitter<ICidade>();

  constructor(private service: CidadeService) {
    this._cidades = this.service.getAll();
  }

  ngOnInit(): void {
    this.populateUfs();
  }

  populateUfs(uf?: string) {
    this.ufs$ = this._cidades.pipe(
      map((x: ICidade[]) => x.map((y) => y.uf)),
      distinct((x) => x)
    );
    this.uf = uf;
  }

  selectUf(uf) {
    this.cidade = <ICidade>{};
    this.writeValue(this.cidade);
    this.cidades$ = this._cidades.pipe(
      map((x: ICidade[]) => x.filter((y) => y.uf == uf))
    );
  }

  selectCidade(cidade: ICidade) {
    this.change.next(cidade);
    this.writeValue(cidade);
  }

  get value(): string {
    return this.cidade.id;
  }

  set value(value: string) {
    const sub = this._cidades
      .pipe(
        take(1),
        map((x: ICidade[]) => x.filter((y) => y.id == value))
      )
      .subscribe((x) => {
        this.cidade = x[0];
        if (!this.uf) {
          this.populateUfs(this.cidade.uf);
        }
      });
    sub.unsubscribe();

    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value: ICidade) {
    if (value) {
      this.value = value.id;
    }

    if (value === null) {
      this.uf = '';
      this.cidade = <ICidade>{};
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.cidade?.id ? null : { cidade: { valid: false } };
  }
}
