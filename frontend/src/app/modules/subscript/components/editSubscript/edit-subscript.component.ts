import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../../services/modal.service';
import {SubscriptService} from '../../../../services/subscript.service';
import {Subscript} from '../../../models/subscript';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-subscript',
  templateUrl: 'edit-subscript.component.html'
})

export class EditSubscriptComponent implements OnInit, OnDestroy {

  @Output() onChanged = new EventEmitter();
  fileList: FileList;
  private subscriptions: Subscription[] = [];

  @Input() selectedSubscript: Subscript;

  constructor(private subscriptService: SubscriptService, private modalService: ModalService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }


  closeModal(): void {
    this.modalService.closeModal();
    this.selectedSubscript = new Subscript();
  }

  uploadImages(event) {
    this.fileList = event.target.files;
  }

  updateSubscript(subscript: Subscript, event): void {
    this.subscriptions.push(this.subscriptService.saveSubscript(subscript).subscribe(data => {
      if (this.fileList && this.fileList.length > 0) {
        this.subscriptions.push(this.subscriptService.saveSubscriptsImage(this.fileList[0], subscript.id).subscribe(value => {
          this.fileList = null;
          this.toastr.success('Изображение успешно изменено', subscript.name);
        }, error => {
          this.toastr.error('Изображение изменить не удалось', 'Ошибка');
        }));
        this.onChanged.emit();
        this.closeModal();
        this.toastr.success('Вы успешно изменили подписку!', subscript.name);
      }
    }, error => {
      event.target.disabled = false;
      this.toastr.error('К сожалению, подписку изменить не удалось', 'Ошибка');
    }));
  }
}

