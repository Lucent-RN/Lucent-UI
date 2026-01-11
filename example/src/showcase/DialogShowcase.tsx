import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Divider,
  TextView,
} from 'lucent-ui';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { AppearanceMode } from 'lucent-ui';

interface DialogShowcaseProps {
  theme: AppearanceMode;
}

export default function DialogShowcase({ theme }: DialogShowcaseProps) {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <>
      <View style={styles.section}>
        <TextView
          style={[
            styles.sectionTitle,
            { color: theme === 'light' ? '#000000' : '#FFFFFF' },
          ]}
        >
          Dialog Modal
        </TextView>
        <View style={styles.componentGroup}>
          {/* Simple Dialog */}
          <Button
            title="Simple Dialog"
            onPress={() => setIsOpen1(true)}
            variant="primary"
            theme={theme}
          />

          {/* Dialog with Header, Body, Footer */}
          <Button
            title="Full Dialog"
            onPress={() => setIsOpen2(true)}
            variant="secondary"
            theme={theme}
          />

          {/* Dialog with Custom Content */}
          <Button
            title="Custom Dialog"
            onPress={() => setIsOpen3(true)}
            variant="underline"
            theme={theme}
          />

          {/* Dialog with Scrollable Body */}
          <Button
            title="Scrollable Dialog"
            onPress={() => setIsOpen4(true)}
            variant="primary"
            theme={theme}
          />
        </View>
      </View>

      {/* Simple Dialog - Default */}
      <Dialog isOpen={isOpen1} onClose={() => setIsOpen1(false)} theme={theme}>
        <DialogContent theme={theme}>
          <DialogBody theme={theme}>
            <TextView
              style={{
                color: theme === 'light' ? '#000000' : '#FFFFFF',
              }}
            >
              This is a simple dialog with default content. You can customize it
              as needed.
            </TextView>
          </DialogBody>
          <DialogFooter theme={theme} align="right">
            <Button
              title="Close"
              onPress={() => setIsOpen1(false)}
              variant="primary"
              size="md"
              theme={theme}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Full Dialog with Header, Body, Footer */}
      <Dialog isOpen={isOpen2} onClose={() => setIsOpen2(false)} theme={theme}>
        <DialogContent theme={theme}>
          <DialogHeader
            title="Confirm Action"
            subtitle="Are you sure you want to proceed with this action?"
            showCloseButton={true}
            onClose={() => setIsOpen2(false)}
            theme={theme}
          />
          <DialogBody theme={theme}>
            <TextView
              style={{
                color: theme === 'light' ? '#000000' : '#FFFFFF',
                marginBottom: 8,
              }}
            >
              This dialog demonstrates a full structure with header, body, and
              footer sections.
            </TextView>
            <TextView
              style={{
                color: theme === 'light' ? '#666666' : '#999999',
              }}
            >
              You can customize each section independently.
            </TextView>
          </DialogBody>
          <DialogFooter theme={theme} align="space-between">
            <Button
              title="Cancel"
              onPress={() => setIsOpen2(false)}
              variant="secondary"
              size="md"
              theme={theme}
              buttonStyle={{
                flex: 1,
              }}
            />
            <Button
              title="Confirm"
              onPress={() => setIsOpen2(false)}
              variant="primary"
              size="md"
              theme={theme}
              buttonStyle={{
                flex: 1,
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Dialog */}
      <Dialog isOpen={isOpen3} onClose={() => setIsOpen3(false)} theme={theme}>
        <DialogContent theme={theme}>
          <DialogHeader theme={theme}>
            <View>
              <TextView
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: theme === 'light' ? '#000000' : '#FFFFFF',
                  marginBottom: 4,
                }}
              >
                Custom Header
              </TextView>
              <TextView
                style={{
                  fontSize: 14,
                  color: theme === 'light' ? '#666666' : '#999999',
                }}
              >
                This header is fully customizable
              </TextView>
            </View>
          </DialogHeader>
          <DialogBody theme={theme}>
            <TextView
              style={{
                color: theme === 'light' ? '#000000' : '#FFFFFF',
              }}
            >
              You can pass any React component as children to customize the
              dialog completely.
            </TextView>
          </DialogBody>
          <DialogFooter theme={theme} align="center">
            <Button
              title="Got it"
              onPress={() => setIsOpen3(false)}
              variant="primary"
              size="md"
              theme={theme}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Scrollable Dialog */}
      <Dialog isOpen={isOpen4} onClose={() => setIsOpen4(false)} theme={theme}>
        <DialogContent theme={theme}>
          <DialogHeader
            title="Long Content"
            subtitle="This dialog has scrollable content"
            showCloseButton={true}
            onClose={() => setIsOpen4(false)}
            theme={theme}
          />
          <DialogBody theme={theme} scrollable={true} maxHeight={300}>
            <TextView
              style={{
                color: theme === 'light' ? '#000000' : '#FFFFFF',
                marginBottom: 16,
              }}
            >
              This is a scrollable dialog body. When content exceeds the maximum
              height, it becomes scrollable.
            </TextView>
            {Array.from({ length: 10 }).map((_, index) => (
              <TextView
                key={index}
                style={{
                  color: theme === 'light' ? '#000000' : '#FFFFFF',
                  marginBottom: 12,
                  lineHeight: 22,
                }}
              >
                Paragraph {index + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </TextView>
            ))}
          </DialogBody>
          <DialogFooter theme={theme} align="right">
            <Button
              title="Close"
              onPress={() => setIsOpen4(false)}
              variant="primary"
              size="md"
              theme={theme}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Divider style={styles.divider} />
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  componentGroup: {
    gap: 12,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 24,
  },
});
