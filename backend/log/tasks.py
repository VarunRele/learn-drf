from celery import shared_task

@shared_task
def my_task(arg1, arg2):
    result = float(arg1) / float(arg2) 
    return result


@shared_task
def periodict():
    print("Hello")
    return "This is a book"