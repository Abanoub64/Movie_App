import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SegmentedControlOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.html',
  styleUrls: ['./switch.css'],
})
export class SegmentedControlComponent {
  @Input() options: SegmentedControlOption[] = [];
  @Input() defaultValue?: string;
  @Output() valueChange = new EventEmitter<string>();

  selected: string = '';

  ngOnInit() {
    this.selected = this.defaultValue || this.options[0]?.value || '';
  }

  selectOption(value: string) {
    this.selected = value;
    this.valueChange.emit(value);
  }
}
