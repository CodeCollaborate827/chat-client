import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";
import { DATE_FORMAT } from "../constants";

@Injectable()
export class DateService {
  public static convertCustomFormatToMoment(customDate: string): dayjs.Dayjs { 
    return dayjs(customDate, DATE_FORMAT);
  }

  public static convertCustomFormatToDate(customDate: string | Date): Date {
    return typeof customDate === 'string' ? DateService.convertCustomFormatToMoment(customDate).toDate() : customDate;
  }

  public static convertToCustomFormat(customDate: string | Date): string {
    return dayjs(customDate).format(DATE_FORMAT);
  }

  public static getDaysLeft(dateTime: number | string | Date): number {
    return dayjs(dateTime).diff(new Date(), 'day');
  }

  public static getDaysBetween(date1: number | string | Date, date2: number | string | Date): number {
    return dayjs(date1).diff(date2, 'day');
  }

  public static getMinutesBetween(date1: number | string | Date, date2: number | string | Date): number {
    return dayjs(date1).diff(date2, 'minute');
  }

  public static getHoursLeft(dateTime: number | string | Date): number { 
    return dayjs(dateTime).diff(new Date(), 'hour');
  }

  public static isBefore(date: string | Date, baseDate: string | Date): boolean {
    return dayjs(date).isBefore(baseDate);
  }

  public static isAfter(date: string | Date, baseDate: string | Date): boolean {
    return dayjs(date).isAfter(baseDate);
  }

  public static isSame(date: string | Date, baseDate: string | Date): boolean {
    return dayjs(date).isSame(baseDate);
  }

  public static addDays(day: string | Date, daysCount: number): Date {
    return dayjs(day).add(daysCount, 'day').toDate();
  }

  public static addMonths(day: string | Date, monthsCount: number): Date {
    return dayjs(day).add(monthsCount, 'month').toDate();
  }

  public static getFirstDayOfMonth(date: string | Date): Date {
    return dayjs(date).startOf('month').toDate();
  }

  public static getLastDayOfMonth(date: string | Date): Date {
    return dayjs(date).endOf('month').toDate();
  }
}