import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscript} from '../models/subscript';
import {SubscriptService} from '../../services/subscript.service';
import {ModalService} from '../../services/modal.service';
import {AuthorizationService} from '../../services/authorization.service';
import {BillingAccountService} from '../../services/billingAccount.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../models/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-subscript',
  templateUrl: './subscript.component.html',
  styleUrls: ['./subscript.component.css']
})
export class SubscriptComponent implements OnInit, OnDestroy {

  public subscripts: Subscript[];
  authorizedUser: User = new User();
  selectedSubscript: Subscript;
  private subscriptions: Subscription[] = [];

  constructor(private subscriptService: SubscriptService, public modalService: ModalService,
              public authService: AuthorizationService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAuthUser();
    this.loadSubscripts();
  }

  getAuthUser() {
    this.subscriptions.push(this.authService.subscribeToAuthUser().subscribe(value => {
      this.authorizedUser = value;
    }));
    this.authService.getAuthUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  onChanged() {
    this.loadSubscripts();
  }

  deleteSubscript(subscript: Subscript) {
    this.subscriptions.push(this.subscriptService.deleteSubscript(subscript.id).subscribe(value => {
      this.loadSubscripts();
      this.toastr.success('Подписка успешно удалена!', 'Успех!');
    }, error => {
      this.toastr.error('Удалить подписку не удалось', 'Ошибка!');
    }));
  }

  private loadSubscripts(): void {
    this.subscriptions.push(this.subscriptService.getSubscripts().subscribe(data => {
      this.subscripts = data;
    }, error => {
      this.toastr.error('Приносим извинения за неудобства', 'Ошибка сервера');
    }));
  }

  public openModalSubscript(template: TemplateRef<any>, subscript: Subscript): void {
    this.modalService.openModal(template);
    this.selectedSubscript = subscript;
  }

  public checkSubscript(subscript: Subscript): boolean {
    return this.authService.checkSubscript(subscript);
  }


}
