import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

export interface IktButtonConfig {
	id?: string;
	default?: boolean;
	label?: string;
	color?: string;
	bgColor?: string;
	styleClass?: string;
	raised?: boolean;
	flat?: boolean;
	stroked?: boolean;
	icon?: string;
	iconSet?: ktButtonIconSet[];
	iconColor?: string;
	iconSize?: string;
	textOnly?: boolean;
	rounded?: boolean;
	outline?: boolean;
	active?: boolean;
	activeColor?: string;
	hostClass?: string;
	disabled?: boolean;
	style?: any;
	disable?: () => boolean;
	visible?: () => boolean;
	command?: (...args) => void;
	command$?: (...args) => Observable<any>;
}

export type ktButtonIconSet = { name: string; value:string, active:boolean}

@Component({
     selector: 'kt-button',
     standalone: true,
     imports:[CommonModule,ButtonModule,RippleModule],
     templateUrl: './button.component.html',
	styles: [`
		:host{display: inline-block;}
		:host.--default{ padding: 5px; background: #4285f4; color: #fff; border-radius: 20px;}
		.kt-btn-icon{font-size: 1.2rem;}
		.kt-btn-txt{padding-left:25px;padding-right:10px;font-size:.9rem}
	`]
})
export class ktButtonComponent {
	@Input() config?: IktButtonConfig;
	@Input() label: string;
	@Input() icon: string;

	@HostBinding('style.pointer-events') get events(): string {
		if (this.config?.disabled) return 'none';
		return 'auto';
	}
	@HostBinding('class.--default') get _() {
		if (this.config?.default) return '--default';
		return '';
	}

	constructor() {}
}


