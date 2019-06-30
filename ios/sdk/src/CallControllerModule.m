//
//  CallControllerModule.m
//  JitsiMeet
//
//  Created by admin on 6/30/19.
//  Copyright © 2019 Jitsi. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CallControllerModule.h"

@implementation CallControllerModule
{
    bool hasListeners;
}

RCT_EXPORT_MODULE();

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(emitEventInternal:)
                                                 name:@"rn-event-emitted"
                                               object:nil];
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

// This will actually throw the event out to our Javascript
- (void)emitEventInternal:(NSNotification *)notification
{
    // We will receive the dictionary here - we now need to extract the name
    // and payload and throw the event
    NSArray *eventDetails = [notification.userInfo valueForKey:@"detail"];
    NSString *eventName = [eventDetails objectAtIndex:0];
    NSDictionary *eventData = [eventDetails objectAtIndex:1];
    
    [self sendEventWithName:eventName
                       body:eventData];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"connection.established"];
}

@end
